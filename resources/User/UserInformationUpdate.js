class UserInformationUpdate {
    constructor(user_id, first_name, last_name, email, phone_number, birth_date, gender, address, relationship) {
        this.user_id = user_id;
        this.userInformation = {
            first_name:   first_name,
            last_name:    last_name,
            email:        email,
            phone_number: phone_number,
            birth_date:   birth_date,
            gender:       gender,
            address:      address,
            relationship: relationship
        };
    }

    changeInformation(query) {
        return query.where('users.id', this.user_id)
                    .update(this.userInformation);
    }
}

module.exports = UserInformationUpdate;
