class createRequestDTO {
    constructor({ personId, phoneNumber, isMain }) {
        this.personId = personId;
        this.phoneNumber = phoneNumber;
        this.isMain = isMain;
    }
}

class updateRequestDTO {
    constructor({ personId, phoneNumber, isMain }) {
        if (personId !== undefined) this.personId = personId;
        if (phoneNumber !== undefined) this.phoneNumber = phoneNumber;
        if (isMain !== undefined) this.isMain = isMain;
    }
}

class createResponseDTO {
    constructor(phone) {
        this.id = phone.id;
        this.personId = phone.personId;
        this.phoneNumber = phone.phoneNumber;
        this.isMain = phone.isMain;
    }
}

module.exports = {
    createRequestDTO,
    updateRequestDTO,
    createResponseDTO
};
