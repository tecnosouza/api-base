const path = require('path');

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
        ...(process.env.DB_DIALECT === 'sqlite' && {
            storage: process.env.DB_STORAGE || path.resolve(__dirname, '../database/db/dev.sqlite'),
            username: undefined,
            password: undefined,
            host: undefined,
            port: undefined,
            logging: console.log
        }),
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
        ...(process.env.DB_DIALECT === 'sqlite' && {
            storage: process.env.DB_STORAGE || path.resolve(__dirname, '../database/db/staging.sqlite'),
            username: undefined,
            password: undefined,
            host: undefined,
            port: undefined,
            logging: console.log,
            dialectOptions: {
                // força FK no SQLite
                foreignKeys: true
            },
            define: {
                // opcional: força constraints para todas as tabelas
                foreignKeyConstraints: true
            },
        }),
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
        ...(process.env.DB_DIALECT === 'sqlite' && {
            storage: process.env.DB_STORAGE || path.resolve(__dirname, '../database/db/prod.sqlite'),
            username: undefined,
            password: undefined,
            host: undefined,
            port: undefined,
            logging: console.log,
            dialectOptions: {
                // força FK no SQLite
                foreignKeys: true
            },
            define: {
                // opcional: força constraints para todas as tabelas
                foreignKeyConstraints: true
            },
        }),
    },
};
