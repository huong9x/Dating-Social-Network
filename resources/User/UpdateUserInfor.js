class UpdateUserInfor {
    constructor(first_name, last_name, email, phone_number, birth_date, gender, address, relationship) {
        this.first_name   = first_name;
        this.last_name    = last_name;
        this.email        = email;
        this.phone_number = phone_number;
        this.birth_date   = birth_date;
        this.gender       = gender;
        this.address      = address;
        this.relationship = relationship;
    }

    buildUpdateQuery(query) {
        return query.update({
                        first_name  : this.first_name,
                        last_name   : this.last_name,
                        email       : this.email,
                        phone_number: this.phone_number,
                        birth_date  : this.birth_date,
                        gender      : this.gender,
                        address     : this.address,
                        relationship: this.relationship
                    });
    }
}

module.exports = UpdateUserInfor;