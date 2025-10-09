/**
 * Normaliza uma string removendo acentos, números, pontuações e caracteres especiais.
 * Também substitui espaços por hífens e converte para minúsculas.
 * @param {string} str - A string de entrada.
 * @returns {string} - A string normalizada.
 */
function normalizeString(str) {
    if (!str || typeof str !== 'string') return '';

    return str
        .normalize('NFD')                    // separa acentos das letras
        .replace(/[\u0300-\u036f]/g, '')     // remove marcas de acento
        .replace(/[^\p{L}\s]/gu, '')         // remove tudo que não for letra nem espaço (pontuação, números, símbolos)
        .trim()                              // remove espaços extras nas pontas
        .replace(/\s+/g, '-')                // troca espaços por hífens
        .toLowerCase();                      // converte para minúsculas
}

module.exports = { normalizeString };
