class CreateAddressDTO {
    constructor({ personId, street, number, neighborhood, city, state, zipCode }) {
        this.personId = personId;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

class UpdateAddressDTO {
    constructor({ personId, street, number, neighborhood, city, state, zipCode }) {
        this.personId = personId;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

class AddressResponseDTO {
    constructor(address) {
        this.id = address.id;
        this.personId = address.personId;
        this.street = address.street;
        this.number = address.number;
        this.neighborhood = address.neighborhood;
        this.city = address.city;
        this.state = address.state;
        this.zipCode = address.zipCode;
        this.createdAt = address.createdAt;
        this.updatedAt = address.updatedAt;
        this.deletedAt = address.deletedAt;
    }
}

module.exports = {
    CreateAddressDTO,
    UpdateAddressDTO,
    AddressResponseDTO
};
