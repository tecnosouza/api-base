const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// __dirname = 'D:/development/tecnosouza/api-base/backend'
// Queremos 'D:/development/tecnosouza/api-base'
const projectRoot = path.resolve(__dirname, '../../../../'); // sobe um nível do backend

// Caminho para o .env na raiz do projeto
const envPath = path.join(projectRoot, '.env');

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Carregado .env da raiz do projeto: ${envPath}`);
} else {
    console.warn(`⚠️ .env não encontrado na raiz do projeto: ${envPath}`);
    dotenv.config(); // fallback para variáveis do sistema
}

module.exports = {
    development: {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: console.log,
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
        },
    },
    staging: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
        },
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
        },
    }
};
