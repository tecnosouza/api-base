const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

function loadEnv() {
    const projectRoot = path.resolve(__dirname, '../../../'); // sobe três níveis do backend/src/config

    const envPath = path.join(projectRoot, '.env');

    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        console.log(`✅ Carregado .env da raiz do projeto: ${envPath}`);
    } else {
        console.warn(`⚠️ .env não encontrado na raiz do projeto: ${envPath}`);
        dotenv.config();
    }
}

module.exports = loadEnv;
