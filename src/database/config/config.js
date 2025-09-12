const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const rootEnv = path.resolve(__dirname, '../../../.env');
const srcEnv = path.resolve(__dirname, '../../.env');

if (fs.existsSync(rootEnv)) {
    dotenv.config({ path: rootEnv });
} else if (fs.existsSync(srcEnv)) {
    dotenv.config({ path: srcEnv });
} else {
    dotenv.config();
}

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: console.log,
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
        },
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: `${process.env.DB_NAME}_test`,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
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
    staging_ssl: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        ssl: 1,
        sslmode: 'require',
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        dialectOptions: {
            connectTimeout: 60000,
            ssl: { require: true, rejectUnauthorized: false },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
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
    },
    production_ssl: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        ssl: 1,
        sslmode: 'require',
        define: {
            underscored: true,
            paranoid: true,
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        dialectOptions: {
            connectTimeout: 60000,
            ssl: { require: true, rejectUnauthorized: false },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
