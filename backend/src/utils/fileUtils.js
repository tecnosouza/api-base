const fs = require('fs');
const path = require('path');

/**
 * Move um arquivo de oldPath para newPath, criando pastas se necessário.
 * @param {string} oldPath - Caminho atual do arquivo
 * @param {string} newPath - Novo caminho do arquivo
 */
const moveFile = (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.dirname(newPath), { recursive: true }, (err) => {
            if (err) return reject(err);

            fs.rename(oldPath, newPath, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

/**
 * Deleta um arquivo do sistema, ignorando erros se não existir
 * @param {string} filePath - Caminho do arquivo a ser deletado
 */
const deleteFile = (filePath) => {
    return new Promise((resolve) => {fs.unlink(filePath, () => {resolve();});});
};

module.exports = { moveFile, deleteFile };
