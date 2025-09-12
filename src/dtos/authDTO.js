class AuthRegisterResponseDTO {
    constructor(person) {
        this.id = person.id;
        this.username = person.username;
        this.name = person.name;
        this.lastName = person.lastName;
        this.dateOfBirth = person.dateOfBirth;
        this.rg = person.rg;
        this.cpf = person.cpf;
        this.street = person.street;
        this.number = person.number;
        this.neighborhood = person.neighborhood;
        this.city = person.city;
        this.state = person.state;
    }
}

class AuthLoginResponseDTO {
    constructor(token, personData) {
        this.token = token;
        this.person = personData;
    }
}

module.exports = {
    AuthRegisterResponseDTO,
    AuthLoginResponseDTO,
};
