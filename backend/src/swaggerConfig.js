const swaggerJsdoc = require('swagger-jsdoc');

module.exports = (apiBaseUrl) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'SGT - API',
                version: '1.0.0',
                description: 'Uma API RESTful robusta para gerenciamento da plataforma SGT, oferecendo recursos completos de autenticação, além de operações CRUD (criação, leitura, atualização e exclusão) para administrar registros de forma eficiente e segura.'
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
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
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
