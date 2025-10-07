class CreatePersonDTO {
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

class UpdatePersonDTO {
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

class PersonResponseDTO {
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

module.exports = {
    CreatePersonDTO,
    UpdatePersonDTO,
    PersonResponseDTO
};
