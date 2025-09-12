

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

function removeAccentsAndLowerCase(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 *
 * @param {Remove acentos e normaliza a string} fileName
 * @returns
 */
function sanitizedString(fileName) {
    const sanitizedFileName = fileName
        .normalize('NFD') // Decompõe caracteres acentuados em partes
        .replace(/[\u0300-\u036f]/g, '') // Remove marcas de diacríticos
        .replace(/[^a-zA-Z0-9.]/g, '_'); // Substitui caracteres especiais por '_'

    return sanitizedFileName;
}

function removeSpecialCharactersAndSpaces(texto) {
    return texto.replace(/[^\w]/gi, '');
}

module.exports = {
    generateRandomString,
    removeAccentsAndLowerCase,
    sanitizedString,
    removeSpecialCharactersAndSpaces,
};
