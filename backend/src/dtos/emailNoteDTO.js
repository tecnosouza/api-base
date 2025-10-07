class CreateEmailNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class UpdateEmailNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class EmailNoteResponseDTO {
    constructor(emailNote) {
        this.id = emailNote.id;
        this.logged_user_id = emailNote.logged_user_id;
        this.table_id = emailNote.table_id;
        this.text = emailNote.text;
        this.created_at = emailNote.created_at;
        this.updated_at = emailNote.updated_at;
        this.deleted_at = emailNote.deleted_at;
    }
}

module.exports = {
    CreateEmailNoteDTO,
    UpdateEmailNoteDTO,
    EmailNoteResponseDTO
};
