const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawn } = require("child_process");
const zlib = require("zlib");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const CONFIG = {
	PG_USER: process.env.DB_USER,
	PG_HOST: process.env.DB_HOST,
	PG_PORT: process.env.DB_PORT || 5432,
	PG_DB: process.env.DB_NAME,
	PG_PASSWORD: process.env.DB_PASSWORD,
	BACKUP_DIR: "./backend/backup/dump",
};

function listBackupFiles() {
	const files = fs.readdirSync(CONFIG.BACKUP_DIR)
		.filter(f => f.endsWith(".gz"))
		.sort()
		.reverse();
	return files;
}

async function selectBackupFile(files) {
	console.log("\nArquivos de backup disponíveis:");
	files.forEach((f, i) => console.log(`${i + 1}. ${f}`));

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const choice = await new Promise(resolve => {
		rl.question("\nDigite o número do arquivo que deseja restaurar: ", answer => {
			rl.close();
			resolve(answer);
		});
	});

	const index = parseInt(choice, 10) - 1;
	if (index < 0 || index >= files.length) throw new Error("Opção inválida");
	return files[index];
}

async function restoreBackup(gzFilePath) {
	if (!fs.existsSync(gzFilePath)) {
		console.error("❌ Arquivo de backup não encontrado:", gzFilePath);
		return;
	}

	console.log(`🟢 Restaurando backup: ${gzFilePath}`);

	const sqlStream = fs.createReadStream(gzFilePath).pipe(zlib.createGunzip());

	const psql = spawn("psql", [
		"-h", CONFIG.PG_HOST,
		"-U", CONFIG.PG_USER,
		"-d", CONFIG.PG_DB
	], {
		env: { PGPASSWORD: CONFIG.PG_PASSWORD, ...process.env },
		stdio: ["pipe", "inherit", "inherit"]
	});

	sqlStream.pipe(psql.stdin);

	psql.on("close", code => {
		if (code === 0) console.log("✅ Restauração concluída!");
		else console.error(`❌ psql terminou com código ${code}`);
	});
}

async function main() {
	const files = listBackupFiles();
	if (files.length === 0) {
		console.log("⚠️ Nenhum backup encontrado.");
		return;
	}

	try {
		const selectedFile = await selectBackupFile(files);
		const fullPath = path.join(CONFIG.BACKUP_DIR, selectedFile);
		await restoreBackup(fullPath);
	} catch (err) {
		console.error("❌ Erro:", err.message);
	}
}

main();
