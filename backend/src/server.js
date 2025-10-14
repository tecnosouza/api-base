require('module-alias/register');

const loadEnv = require('./config/env');
loadEnv();

const cors = require('cors');
const express = require('express');
const { sequelize } = require('@models/index');
const v1Routes = require('@routes/v1');
const swaggerUi = require('swagger-ui-express');
const getSwaggerSpec = require('./swaggerConfig');
const errorHandler = require('@middleware/errorHandler');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Cria pasta de database se necessário (para SQLite)
const dbPath = path.resolve(__dirname, 'database');
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
    console.log(`📁 Pasta de banco criada em ${dbPath}`);
}

// Cria pasta de database se necessário (para SQLite)
const uploadPath = path.resolve(__dirname, '../uploads/tmp');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(`📁 Pasta de uploads criada em ${uploadPath}`);
}

// Middleware básicos
app.set('trust proxy', 1);
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Serve arquivos da pasta 'public'
app.use(express.static('public'));

// Serve arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json({ limit: '10mb' })); // protege contra payloads grandes

// Timeout middleware
app.use((req, res, next) => {
    req.setTimeout(15000);
    res.setTimeout(15000);
    next();
});

/**
 * Configurações I18n
*/
const { I18n } = require('i18n');
const i18n = new I18n({
    locales: ['pt-BR', 'en'],
    directory: path.join(__dirname, 'translations'),
    defaultLocale: 'pt-BR',
    register: global
});
app.use(i18n.init);

// Swagger
app.use('/api-docs', (req, res, next) => {
    const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
    req.swaggerSpec = getSwaggerSpec(apiBaseUrl);
    next();
}, swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(req.swaggerSpec, {
        customCssUrl: '/swagger-custom.css',
        customSiteTitle: 'API - Estudantes',
        customfavIcon: '/favicon.ico',
    })(req, res, next);
});

// Rotas
app.use('/api/v1', v1Routes);
app.use(errorHandler);

// Inicializa o servidor
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao banco de dados com sucesso.');
        app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
    } catch (error) {
        console.error('❌ Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
})();
