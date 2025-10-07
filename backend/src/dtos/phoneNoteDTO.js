class CreatePhoneNoteDTO {
    constructor({ phoneId, note }) {
        this.phoneId = phoneId;
        this.note = note;
    }
}

class UpdatePhoneNoteDTO {
    constructor({ phoneId, note }) {
        this.phoneId = phoneId;
        this.note = note;
    }
}

class PhoneNoteResponseDTO {
    constructor(phoneNote) {
        this.id = phoneNote.id;
        this.phoneId = phoneNote.phoneId;
        this.note = phoneNote.note;
    }
}

module.exports = {
    CreatePhoneNoteDTO,
    UpdatePhoneNoteDTO,
    PhoneNoteResponseDTO
};
