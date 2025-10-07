class CreateEmailNoteDTO {
    constructor({ emailId, note }) {
        this.emailId = emailId;
        this.note = note;
    }
}

class UpdateEmailNoteDTO {
    constructor({ emailId, note }) {
        this.emailId = emailId;
        this.note = note;
    }
}

class EmailNoteResponseDTO {
    constructor(emailNote) {
        this.id = emailNote.id;
        this.emailId = emailNote.emailId;
        this.note = emailNote.note;
        this.createdAt = emailNote.createdAt;
        this.updatedAt = emailNote.updatedAt;
        this.deletedAt = emailNote.deletedAt;
    }
}

module.exports = {
    CreateEmailNoteDTO,
    UpdateEmailNoteDTO,
    EmailNoteResponseDTO
};
