const swaggerJsdoc = require('swagger-jsdoc');

module.exports = (apiBaseUrl) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'SGT - API',
                version: '1.0.0',
                description: 'Uma API RESTful robusta para gerenciamento da plataforma BASE-API, oferecendo recursos completos de autenticação, além de operações CRUD (criação, leitura, atualização e exclusão) para administrar registros de forma eficiente e segura.'
            },
            servers: [
                {
                    url: `${apiBaseUrl}/api/v1`,
                    description: 'Versionamento v1',
                }
            ],
            tags: [
                {
                    name: 'Gerais',
                    description: 'Rotas de status da API'
                },
                {
                    name: 'Autenticações',
                    description: 'Rotas de autenticação de usuário'
                },
                {
                    name: 'Níveis de Acesso',
                    description: 'Rotas de níveis de acesso'
                },
                {
                    name: 'Acessos',
                    description: 'Rotas de acessos'
                },
                {
                    name: 'Categorias',
                    description: 'Rotas de categorias'
                },
                {
                    name: 'Usuários',
                    description: 'Rotas de usuários'
                },
                {
                    name: 'Produtos',
                    description: 'Rotas de produtos'
                },
                {
                    name: 'Configurações',
                    description: 'Rotas de configurações'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
                schemas: {
                    AccessLevelInput: {
                        type: 'object',
                        required: ['name'],
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Nome do nível de acesso',
                                example: 'Administrador'
                            }
                        }
                    },
                    AccessInput: {
                        type: 'object',
                        required: ['personId', 'accessLevelId', 'username', 'password'],
                        properties: {
                            personId: {
                                type: 'string',
                                description: 'ID da pessoa associada ao acesso',
                                example: 'uuid-person-123'
                            },
                            accessLevelId: {
                                type: 'string',
                                description: 'ID do nível de acesso',
                                example: 'uuid-accesslevel-456'
                            },
                            username: {
                                type: 'string',
                                description: 'Nome de usuário para login',
                                example: 'joao.silva'
                            },
                            password: {
                                type: 'string',
                                description: 'Senha do usuário',
                                example: 'senhaSegura123'
                            }
                        }
                    },
                    CategoryInput: {
                        type: 'object',
                        required: ['name'],
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Nome da categoria',
                                example: 'Eletrônicos'
                            }
                        }
                    },
                    PersonInput: {
                        type: 'object',
                        required: ['name', 'document'],
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Nome completo da pessoa',
                                example: 'João da Silva'
                            },
                            document: {
                                type: 'string',
                                description: 'CPF ou CNPJ da pessoa',
                                example: '123.456.789-00'
                            },
                            type: {
                                type: 'string',
                                description: 'Tipo de pessoa (Física ou Jurídica)',
                                example: 'Física'
                            },
                            birthDate: {
                                type: 'string',
                                format: 'date',
                                description: 'Data de nascimento da pessoa (YYYY-MM-DD)',
                                example: '1990-01-01'
                            },
                            gender: {
                                type: 'string',
                                description: 'Gênero da pessoa',
                                example: 'Masculino'
                            }
                        }
                    },
                    ProductInput: {
                        type: 'object',
                        required: ['name', 'description', 'price', 'categoryId'],
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Nome do produto',
                                example: 'Smartphone X'
                            },
                            description: {
                                type: 'string',
                                description: 'Descrição detalhada do produto',
                                example: 'Um smartphone de última geração com câmera de 108MP.'
                            },
                            price: {
                                type: 'number',
                                format: 'float',
                                description: 'Preço do produto',
                                example: 999.99
                            },
                            categoryId: {
                                type: 'string',
                                description: 'ID da categoria do produto',
                                example: 'uuid-category-789'
                            },
                            image: {
                                type: 'string',
                                format: 'binary',
                                description: 'Imagem do produto (upload de arquivo)'
                            }
                        }
                    },
                    SettingInput: {
                        type: 'object',
                        required: ['key', 'value'],
                        properties: {
                            key: {
                                type: 'string',
                                description: 'Chave da configuração',
                                example: 'APP_NAME'
                            },
                            value: {
                                type: 'string',
                                description: 'Valor da configuração',
                                example: 'Minha Aplicação'
                            }
                        }
                    }
                },
                parameters: {
                    PaginationParameters: {
                        name: 'page',
                        in: 'query',
                        description: 'Número da página',
                        required: false,
                        schema: {
                            type: 'integer',
                            minimum: 1,
                            default: 1,
                            example: 1,
                        },
                    },
                    LimitParameters: {
                        name: 'limit',
                        in: 'query',
                        description: 'Limite de registros por página',
                        required: false,
                        schema: {
                            type: 'integer',
                            minimum: 1,
                            default: 10,
                            maximum: 100,
                            example: 10,
                        },
                    },
                    OrderByParameters: {
                        name: 'orderBy',
                        in: 'query',
                        description: 'Tipo de ordenação da página. Ex: [{"field": "nome","type": "ASC"}]',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    FiltersParameters: {
                        name: 'filters',
                        in: 'query',
                        description: `Filtros adicionais para a consulta. Ex: [{"column": "nome", "operator": "contains", "value": "João"}].
                        Operadores disponíveis: "contains", "notContains", "startsWith", "endsWith", "equals", "notEquals", "between" (para datas).`,
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    ColumnsParameters: {
                        name: 'columns',
                        in: 'query',
                        description: 'Colunas específicas a serem retornadas (separadas por vírgula, ex: id,name).',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    }
                }
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ['./src/routes/shared/*.js', './src/routes/v1/*.js'],
    };

    return swaggerJsdoc(options);
};
