const loadEnv = require('../src/config/env');
loadEnv();

const { exec } = require('child_process');
const path = require('path');

console.log('Iniciando a configuração do ambiente de desenvolvimento...');

const runCommand = (command, options = {}) =>
    new Promise((resolve, reject) => {
        exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
            if (error) {
                const stderrText = stderr.toString();
                const ignoreErrors = options.ignoreErrors || [];

                const isIgnorable = ignoreErrors.some((ignored) => stderrText.includes(ignored));

                if (isIgnorable) {
                    console.warn(`⚠️  Erro ignorado ao executar "${command}":`, stderrText.trim());
                    resolve();
                    return;
                }

                console.error(`❌ Erro ao executar "${command}":`, stderrText.trim());
                reject(error);
                return;
            }

            console.log(`✅ ${command} executado com sucesso.`);
            if (stdout.trim()) console.log(stdout.trim());
            resolve();
        });
    });

const setupEnvironment = async () => {
    try {
        const dialect = process.env.DB_DIALECT;

        // ⚙️ Se não for SQLite, cria o banco normalmente
        if (dialect !== 'sqlite') {
            await runCommand('yarn sequelize db:create', {
                ignoreErrors: ['already exists'],
            });
        } else {
            console.log('⚠️  SQLite detectado — pulando o comando "db:create" (arquivo será criado automaticamente).');
        }

        await runCommand('yarn sequelize db:migrate');
        await runCommand('yarn sequelize db:seed:all');

        console.log('✅ Ambiente de desenvolvimento configurado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao configurar o ambiente de desenvolvimento:', error);
        process.exit(1);
    }
};

setupEnvironment();
