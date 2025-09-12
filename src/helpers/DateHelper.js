function formatDate(value) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(value).toLocaleDateString('pt-BR', options);
}

function getCurrentDate() {
    return new Date();
}

module.exports = {
    formatDate,
    getCurrentDate,
};
