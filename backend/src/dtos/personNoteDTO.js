class CreatePersonNoteDTO {
    constructor({ personId, note }) {
        this.personId = personId;
        this.note = note;
    }
}

class UpdatePersonNoteDTO {
    constructor({ personId, note }) {
        this.personId = personId;
        this.note = note;
    }
}

class PersonNoteResponseDTO {
    constructor(personNote) {
        this.id = personNote.id;
        this.personId = personNote.personId;
        this.note = personNote.note;
    }
}

module.exports = {
    CreatePersonNoteDTO,
    UpdatePersonNoteDTO,
    PersonNoteResponseDTO
};
