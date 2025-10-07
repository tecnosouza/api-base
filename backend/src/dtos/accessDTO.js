class CreateAccessDTO {
    constructor({ personId, accessLevelId, username, password, active }) {
        this.personId = personId;
        this.accessLevelId = accessLevelId;
        this.username = username;
        this.password = password;
        this.active = active;
    }
}

class UpdateAccessDTO {
    constructor({ personId, accessLevelId, username, password, active }) {
        this.personId = personId;
        this.accessLevelId = accessLevelId;
        this.username = username;
        this.password = password;
        this.active = active;
    }
}

class AccessResponseDTO {
    constructor(access) {
        this.id = access.id;
        this.person_id = access.person_id;
        this.crude = access.crude;
        this.created_at = access.created_at;
        this.updated_at = access.updated_at;
        this.deleted_at = access.deleted_at;
    }
}

module.exports = {
    CreateAccessDTO,
    UpdateAccessDTO,
    AccessResponseDTO
};
