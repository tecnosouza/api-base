class CreatePersonNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class UpdatePersonNoteDTO {
    constructor({ logged_user_id, table_id, text }) {
        this.logged_user_id = logged_user_id;
        this.table_id = table_id;
        this.text = text;
    }
}

class PersonNoteResponseDTO {
    constructor(personNote) {
        this.id = personNote.id;
        this.logged_user_id = personNote.logged_user_id;
        this.table_id = personNote.table_id;
        this.text = personNote.text;
        this.created_at = personNote.created_at;
        this.updated_at = personNote.updated_at;
        this.deleted_at = personNote.deleted_at;
    }
}

module.exports = {
    CreatePersonNoteDTO,
    UpdatePersonNoteDTO,
    PersonNoteResponseDTO
};
