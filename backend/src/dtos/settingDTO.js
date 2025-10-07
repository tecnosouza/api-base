class SettingResponseDTO {
    constructor(setting) {
        this.id = setting.id;
        this.person_id = setting.person_id;
        this.scale = setting.scale;
        this.style_menu = setting.style_menu;
        this.theme = setting.theme;
    }
}

module.exports = {
    SettingResponseDTO
};
