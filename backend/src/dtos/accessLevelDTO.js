class CreateAccessLevelDTO {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }
}

class UpdateAccessLevelDTO {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }
}

class AccessLevelResponseDTO {
    constructor(accessLevel) {
        this.id = accessLevel.id;
        this.name = accessLevel.name;
        this.description = accessLevel.description;
        this.createdAt = accessLevel.createdAt;
        this.updatedAt = accessLevel.updatedAt;
        this.deletedAt = accessLevel.deletedAt;
    }
}

module.exports = {
    CreateAccessLevelDTO,
    UpdateAccessLevelDTO,
    AccessLevelResponseDTO
};
