/* eslint-disable indent */
/* eslint-disable no-fallthrough */
/* eslint-disable no-undef */
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { removeAccentsAndLowerCase } = require('../../helpers/StringHelper');

module.exports = {

	async dataFilter(model, query, include) {        

		let {
			page = 1, // Receber o numero da pagina
			orderBy,  // Tipo de ordenação da pagina
			limit = 50, // Limit de registros da pagina por chamada
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
		let objWhereDynamic = {};
		let objWhereDynamicOthers = {};

		// Adiciona o where principal para todas as consultas padroes
		objWhereDynamic['deleted_at'] = null;

		switch (model.name.toString()) {
			case 'FinancialCategories':
				objWhereDynamic['systematic'] = false; // Removendo as categorias sistemáticas
			case 'Persons':
				objWhereDynamic['id'] = { [Op.notIn]: [1, 2] }; // Removendo da exibição os usuarios Henrique e Thomas
				break;
		}

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
				} else if (filter?.operator?.toLowerCase() === 'like') {
					objWhereDynamic[filter.property] = {
						[Op.iLike]: `%${removeAccentsAndLowerCase(filter.value)}%`
					};
				} else if (filter?.operator?.toLowerCase() === 'notin') {
					objWhereDynamic[filter.property] = {
						[Op.notIn]: filter.value
					};
				} else if (filter?.operator?.toLowerCase() === 'between') {
					const [date1, date2] = filter.value.split(',');

					let date1ISO = moment(date1).tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
					let date2ISO = moment(date2).tz('America/Sao_Paulo').endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

					if (date1ISO != null && date2ISO != null) {
						objWhereDynamic[filter.property] = {
							[Op.between]: [date1ISO, date2ISO]
						};
					}
				} else {
					if (!filter.property.includes('.')) {
						objWhereDynamic[filter.property] = filter.value;
					} else {
						objWhereDynamicOthers[filter.property] = filter.value;
					}
				}
			});
		}

		let modifiedInclude = [];
		let bAddIncludes = !!(addIncludes === 'true');
		if (include && bAddIncludes) {
			if (objWhereDynamicOthers.length > 0) {
				for (const [field, value] of Object.entries(objWhereDynamicOthers)) {
					let dotIndex = field.indexOf('.');
					let associationName = dotIndex !== -1 ? field.substring(0, dotIndex) : field;

					include.forEach((inc) => {
						if (inc.association === associationName) {
							inc.where = { type: value };
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
		let aOrderBy = new Array();
		if (orderBy != null && orderBy != undefined && orderBy != 'undefined' && orderBy.length > 0) {
			const jOrderByJSON = JSON?.parse(orderBy);

			jOrderByJSON.forEach(objeto => {
				aOrderBy.push([objeto.field, objeto.type]);
			});
		}

		/**
		 * Montagem das COLUNAS
		 */
		let attributes = null;
		if (columns != null) {
			let aAttributes = [];
			columns.split(',').forEach(function (column) {
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

		// Verifica se include está definido e não é nulo
		if (include) {
			switch (model.name.toString().toLowerCase()) {
				case 'orders':
					countOptions.include = null;
					break;
				default:
					countOptions.include = include;
					break;
			}
		}

		//Contar a quantidade de paginas
		const countModel = await model.count(countOptions);

		// Caso não encontre registos
		if (countModel == 0) {
			return { code: '204', message: __('DATA_NOT_FOUND') };
		}

		lastPage = Math.ceil(countModel / limit);

		// -------------------------------------
		// NOVO: cursor interno ao invés de offset
		// -------------------------------------
		let cursorId = null;

		if (page > 1) {
			const row = await model.findOne({
				where: objWhereDynamic,
				attributes: ['id'],
				order: (orderBy && Array.isArray(orderBy) && orderBy.length > 0) ? orderBy : [['id', 'DESC']],
				offset: (page - 1) * limit,
			});

			cursorId = row ? row.id : null;
		}

		// Ajusta o where para usar cursor em vez de offset
		let objWhereForQuery = { ...objWhereDynamic };
		if (cursorId) {
			objWhereForQuery.id = { [Op.lte]: cursorId }; // DESC → id menor ou igual
		}

		let pagination = {
			attributes: attributes,
			include: modifiedInclude,
			objWhere: objWhereForQuery,
			orderBy: aOrderBy,
			groupBy,
			limit,
			page,
			prev_page_url: ((page - 1) >= 1) ? (page - 1) : null,
			next_page_url: Number(page) + Number(1) > lastPage ? null : Number(page) + Number(1),
			last_page: lastPage,
			total: countModel,
			code: '200',
			message: __('SUCCESS')
		};

		return pagination;
	}

};
