const loadEnv = require('./config/env');
loadEnv();

require('module-alias/register');
const cors = require('cors');
const express = require('express');
const { sequelize } = require('@models/index.js');
const v1Routes = require('@routes/v1');
const swaggerUi = require('swagger-ui-express');
const getSwaggerSpec = require('./swaggerConfig');
const errorHandler = require('@middleware/errorHandler');

const app = express();
app.set('trust proxy', true);

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
    req.setTimeout(10000);
    res.setTimeout(10000);
    next();
});

app.use('/api-docs', (req, res, next) => {
    const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
    req.swaggerSpec = getSwaggerSpec(apiBaseUrl);
    next();
}, swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(req.swaggerSpec, { customCssUrl: '/swagger-custom.css', customSiteTitle: 'API - Estudantes', customfavIcon: '/favicon.ico' })(req, res, next);
});

app.use('/api/v1', v1Routes); // Rotas da versão 1
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
