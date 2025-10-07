class CreateAddressDTO {
    constructor({ person_id, warehouse_id, default: isDefault, zipcode, street, number, complement, neighborhood, city, state, latitude, longitude, is_active }) {
        this.person_id = person_id;
        this.warehouse_id = warehouse_id;
        this.default = isDefault;
        this.zipcode = zipcode;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.is_active = is_active;
    }
}

class UpdateAddressDTO {
    constructor({ person_id, warehouse_id, default: isDefault, zipcode, street, number, complement, neighborhood, city, state, latitude, longitude, is_active }) {
        this.person_id = person_id;
        this.warehouse_id = warehouse_id;
        this.default = isDefault;
        this.zipcode = zipcode;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.is_active = is_active;
    }
}

class AddressResponseDTO {
    constructor(address) {
        this.id = address.id;
        this.person_id = address.person_id;
        this.warehouse_id = address.warehouse_id;
        this.default = address.default;
        this.zipcode = address.zipcode;
        this.street = address.street;
        this.number = address.number;
        this.complement = address.complement;
        this.neighborhood = address.neighborhood;
        this.city = address.city;
        this.state = address.state;
        this.latitude = address.latitude;
        this.longitude = address.longitude;
        this.is_active = address.is_active;
        this.created_at = address.created_at;
        this.updated_at = address.updated_at;
        this.deleted_at = address.deleted_at;
    }
}

module.exports = {
    CreateAddressDTO,
    UpdateAddressDTO,
    AddressResponseDTO
};
