function onlyNumbers(string) {
    return string.replace(/[^0-9]/g, '');
}

module.exports = {
    onlyNumbers,
};
