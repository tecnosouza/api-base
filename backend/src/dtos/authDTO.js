class AuthLoginRequestDTO {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}

class AuthLoginResponseDTO {
    constructor(token) {
        this.token = token;
    }
}

module.exports = {
    AuthLoginRequestDTO,
    AuthLoginResponseDTO,
};
