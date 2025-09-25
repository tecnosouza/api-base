const crypto = require('crypto');

function generateUniqueHash() {
    const currentTimestamp = new Date().getTime().toString();
    const hash = crypto.createHash('sha256');
    hash.update(currentTimestamp);
    return hash.digest('hex');
}

module.exports = {
    generateUniqueHash,
};
