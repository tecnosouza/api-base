const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { removeAccentsAndLowerCase } = require('@helpers/StringHelper');

class DataBaseService {
    constructor(model) {
        this.model = model;
    }

    async dataFilter(model, query, include) {
        let { page = 1, // Receber o numero da pagina
            orderBy, // Tipo de ordenação da pagina
            limit = 10, // Limit de registros da pagina por chamada
            filters = null, // Filtros adicionais
            columns = null, // Solicitação de colunas especificas
            groupBy = false, // groupBy
            addIncludes = 'true', // addIncludes
        } = query;

        /**
     * Validação page
     */
        page = (page < 1) ? 1 : page;

        /**
     * Montagem do LIMIT dinamicamente
     */
        if (limit > 50) {
            limit = 50;
        }

        /**
     * Montagem do WHERE dinamicamente
     */
        const objWhereDynamic = {};
        const objWhereDynamicOthers = {};

        // Percorre os paramentros para adicionar nos fltros
        if (filters != null) {
            filters = JSON.parse(filters);
            filters.forEach((filter) => {
                if (filter.value != null && filter.value != undefined && typeof filter.value == 'string') {
                    filter.value = filter.value.trim();
                }

                // Verifica é necessário que sejam retornados todos os dados cadastrados, removendo o limit
                if (filter?.property?.toLowerCase() === 'infinitylimit') {
                    limit = null;
                } else if (filter?.operator?.toLowerCase() === 'contains') { // contém
                    objWhereDynamic[filter.column] = {
                        [Op.iLike]: `%${removeAccentsAndLowerCase(filter.value)}%`,
                    };
                } else if (filter?.operator?.toLowerCase() === 'notContains') { // não contém
                    objWhereDynamic[filter.column] = {
                        [Op.notILike]: `%${removeAccentsAndLowerCase(filter.value)}%`,
                    };
                } else if (filter?.operator?.toLowerCase() === 'startsWith') { // começa com
                    objWhereDynamic[filter.column] = {
                        [Op.iLike]: `${removeAccentsAndLowerCase(filter.value)}%`,
                    };
                } else if (filter?.operator?.toLowerCase() === 'endsWith') { // termina com
                    objWhereDynamic[filter.column] = {
                        [Op.iLike]: `%${removeAccentsAndLowerCase(filter.value)}`,
                    };
                } else if (filter?.operator?.toLowerCase() === 'equals') { // igual
                    objWhereDynamic[filter.column] = {
                        [Op.eq]: filter.value,
                    };
                } else if (filter?.operator?.toLowerCase() === 'notEquals') { // diferente
                    objWhereDynamic[filter.column] = {
                        [Op.ne]: filter.value,
                    };
                } else if (filter?.operator?.toLowerCase() === 'between') { // entre (apenas para data)
                    const [date1, date2] = filter.value.split(',');

                    const date1ISO = moment(date1).tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
                    const date2ISO = moment(date2).tz('America/Sao_Paulo').endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

                    if (date1ISO != null && date2ISO != null) {
                        objWhereDynamic[filter.column] = {
                            [Op.between]: [date1ISO, date2ISO],
                        };
                    }
                } else if (filter.column.includes('.')) {
                    objWhereDynamicOthers[filter.column] = filter.value;
                } else {
                    objWhereDynamic[filter.column] = filter.value;
                }
            });
        }

        const modifiedInclude = [];
        const bAddIncludes = !!(addIncludes === 'true');
        if (include && bAddIncludes) {
            if (Object.keys(objWhereDynamicOthers).length > 0) {
                for (const [field, value] of Object.entries(objWhereDynamicOthers)) {
                    const dotIndex = field.indexOf('.');
                    const associationName = dotIndex !== -1 ? field.substring(0, dotIndex) : field;

                    include.forEach((inc) => {
                        if (inc.association === associationName) {
                            inc.where = { [field.substring(dotIndex + 1)]: value };
                            modifiedInclude.push(inc);
                        } else {
                            modifiedInclude.push(inc);
                        }
                    });
                }
            } else {
                include.forEach((inc) => {
                    modifiedInclude.push(inc);
                });
            }
        }

        /**
     * Montagem do orderBy dinamicamente
     * [{"field": "imei","type": "ASC"}]
     */
        const aOrderBy = [];
        if (orderBy != null && orderBy != undefined && orderBy != 'undefined' && orderBy.length > 0) {
            const jOrderByJSON = JSON?.parse(orderBy);

            jOrderByJSON.forEach((objeto) => {
                aOrderBy.push([objeto.field, objeto.type]);
            });
        }

        /**
     * Montagem das COLUNAS
     */
        let attributes = null;
        if (columns != null) {
            const aAttributes = [];
            columns.split(',').forEach((column) => {
                aAttributes.push(column);
            });

            if (aAttributes.length > 0) {
                attributes = aAttributes;
            }
        }

        // variavel com o numero da ultima pagina
        let lastPage = 1;

        const countOptions = {};

        // Verifica se objWhereDynamic está definido e não é nulo
        if (objWhereDynamic) {
            countOptions.where = objWhereDynamic;
        }

        // Contar a quantidade de paginas
        const countModel = await model.count(countOptions);

        // Caso não encontre registos
        if (countModel == 0) {
            return { code: '204', message: 'Dados não encontrados!' };
        }

        lastPage = limit === null ? 1 : Math.ceil(countModel / limit);

        const offset = Number((page * limit) - limit);

        const pagination = {
            attributes,
            include: modifiedInclude,
            objWhere: objWhereDynamic,
            orderBy: aOrderBy,
            groupBy,
            offset,
            limit,
            current_page: page,
            last_page: lastPage,
            total: countModel,
            code: '200',
            message: 'sucesso',
        };

        return pagination;
    }
}

module.exports = DataBaseService;
