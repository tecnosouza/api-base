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
        this.personId = access.personId;
        this.accessLevelId = access.accessLevelId;
        this.username = access.username;
        this.lastLogin = access.lastLogin;
        this.active = access.active;
        this.createdAt = access.createdAt;
        this.updatedAt = access.updatedAt;
        this.deletedAt = access.deletedAt;
    }
}

module.exports = {
    CreateAccessDTO,
    UpdateAccessDTO,
    AccessResponseDTO
};
