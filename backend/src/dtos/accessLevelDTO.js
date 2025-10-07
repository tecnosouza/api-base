class CreateAccessLevelDTO {
    constructor({ level_name, crude, is_active, default: isDefault }) {
        this.level_name = level_name;
        this.crude = crude;
        this.is_active = is_active;
        this.default = isDefault;
    }
}

class UpdateAccessLevelDTO {
    constructor({ level_name, crude, is_active, default: isDefault }) {
        this.level_name = level_name;
        this.crude = crude;
        this.is_active = is_active;
        this.default = isDefault;
    }
}

class AccessLevelResponseDTO {
    constructor(accessLevel) {
        this.id = accessLevel.id;
        this.level_name = accessLevel.level_name;
        this.crude = accessLevel.crude;
        this.default = accessLevel.default;
        this.is_active = accessLevel.is_active;
        this.created_at = accessLevel.created_at;
        this.updated_at = accessLevel.updated_at;
        this.deleted_at = accessLevel.deleted_at;
    }
}

module.exports = {
    CreateAccessLevelDTO,
    UpdateAccessLevelDTO,
    AccessLevelResponseDTO
};
