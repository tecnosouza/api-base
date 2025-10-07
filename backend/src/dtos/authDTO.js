const { PersonResponseDTO } = require('./personDTO');

class AuthLoginRequestDTO {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}

class AuthLoginResponseDTO {
    constructor(token, personData) {
        this.token = token;
        this.person = new PersonResponseDTO(personData);
    }
}

module.exports = {
    AuthLoginRequestDTO,
    AuthLoginResponseDTO,
};
