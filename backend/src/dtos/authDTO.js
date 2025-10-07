class AuthRegisterRequestDTO {
    constructor({ username, password, name, lastName, dateOfBirth, rg, cpf, street, number, neighborhood, city, state }) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.rg = rg;
        this.cpf = cpf;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
    }
}

class AuthLoginRequestDTO {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}

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
    AuthRegisterRequestDTO,
    AuthLoginRequestDTO,
    AuthRegisterResponseDTO,
    AuthLoginResponseDTO,
};
