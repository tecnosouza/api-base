class CreatePhoneNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class UpdatePhoneNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class PhoneNoteResponseDTO {
    constructor(phoneNote) {
        this.id = phoneNote.id;
        this.logged_user_id = phoneNote.logged_user_id;
        this.table_id = phoneNote.table_id;
        this.text = phoneNote.text;
        this.created_at = phoneNote.created_at;
        this.updated_at = phoneNote.updated_at;
        this.deleted_at = phoneNote.deleted_at;
    }
}

module.exports = {
    CreatePhoneNoteDTO,
    UpdatePhoneNoteDTO,
    PhoneNoteResponseDTO
};
