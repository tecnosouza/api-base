class CreatePersonDTO {
    constructor({ username, password, name, last_name, date_of_birth, rg, cpf, admin }) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.rg = rg;
        this.cpf = cpf;
        this.admin = admin;
    }
}

class UpdatePersonDTO {
    constructor({ username, password, name, last_name, date_of_birth, rg, cpf, admin }) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.rg = rg;
        this.cpf = cpf;
        this.admin = admin;
    }
}

class PersonResponseDTO {
    constructor(person) {
        this.id = person.id;
        this.username = person.username;
        this.name = person.name;
        this.last_name = person.last_name;
        this.date_of_birth = person.date_of_birth;
        this.rg = person.rg;
        this.cpf = person.cpf;
        this.admin = person.admin;
        this.created_at = person.created_at;
        this.updated_at = person.updated_at;
        this.deleted_at = person.deleted_at;
    }
}

module.exports = {
    CreatePersonDTO,
    UpdatePersonDTO,
    PersonResponseDTO
};
