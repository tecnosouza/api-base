const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const CONFIG = {
    PG_USER: process.env.DB_USER,
    PG_HOST: process.env.DB_HOST,
    PG_PORT: process.env.DB_PORT || 5432,
    PG_DB: process.env.DB_NAME,
    PG_PASSWORD: process.env.DB_PASSWORD,
    BACKUP_DIR: './backend/backup/dump',
    KEEP_DAYS: parseInt(process.env.BACKUP_KEEP_DAYS || '7'),
};

async function ensureBackupDir() {
    if (!fs.existsSync(CONFIG.BACKUP_DIR)) {
        fs.mkdirSync(CONFIG.BACKUP_DIR, { recursive: true });
    }
}

function getBackupFilename() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(CONFIG.BACKUP_DIR, `${CONFIG.PG_DB}_${date}.sql`);
}

async function runBackup() {
    await ensureBackupDir();
    const sqlFile = getBackupFilename();
    const gzFile = `${sqlFile}.gz`;

    console.log(`🗄️  Iniciando backup de ${CONFIG.PG_DB}...`);

    const client = new Client({
        user: CONFIG.PG_USER,
        host: CONFIG.PG_HOST,
        database: CONFIG.PG_DB,
        password: CONFIG.PG_PASSWORD,
        port: CONFIG.PG_PORT,
    });

    await client.connect();

    try {
        const tables = await client.query(`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname='public';
        `);

        let dump = '';
        for (const row of tables.rows) {
            const table = row.tablename;
            dump += `\n-- TABLE: ${table}\n\n`;

            const createTableRes = await client.query(`SELECT pg_get_tabledef('${table}'::regclass);`).catch(() => null);
            if (createTableRes?.rows?.[0]?.pg_get_tabledef) {
                dump += `${createTableRes.rows[0].pg_get_tabledef};\n\n`;
            }

            const data = await client.query(`SELECT * FROM "${table}"`);
            if (data.rows.length > 0) {
                dump += `COPY "${table}" FROM stdin;\n`;
                data.rows.forEach((row) => {
                    dump += Object.values(row).map(v => (v === null ? '\\N' : v)).join('\t') + '\n';
                });
                dump += '\\.\n\n';
            }
        }

        fs.writeFileSync(sqlFile, dump);
        console.log('✅ Backup SQL criado:', sqlFile);

        const gzip = zlib.createGzip();
        const input = fs.createReadStream(sqlFile);
        const output = fs.createWriteStream(gzFile);

        input.pipe(gzip).pipe(output).on('finish', () => {
            fs.unlinkSync(sqlFile);
            console.log('📦 Backup comprimido:', gzFile);
            cleanupOldBackups();
        });
    } catch (error) {
        console.error('❌ Erro ao gerar backup:', error);
    } finally {
        await client.end();
    }
}

function cleanupOldBackups() {
    const files = fs.readdirSync(CONFIG.BACKUP_DIR);
    const now = Date.now();

    files.forEach((file) => {
        if (file.endsWith('.gz')) {
            const filePath = path.join(CONFIG.BACKUP_DIR, file);
            const stats = fs.statSync(filePath);
            const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);
            if (ageDays > CONFIG.KEEP_DAYS) {
                fs.unlinkSync(filePath);
                console.log(`🧹 Removido backup antigo: ${file}`);
            }
        }
    });
}

runBackup();
