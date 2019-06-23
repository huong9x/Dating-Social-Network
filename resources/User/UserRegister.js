class UserRegister {
    constructor(username, password, first_name, last_name, email, birth_date, gender) {
        this.registerInformation = {
            username:   username,
            password:   password,
            first_name: first_name,
            last_name:  last_name,
            email:      email,
            birth_date: birth_date,
            gender: gender
        };
    }
    register(query) {
        return query.insert(this.registerInformation);
    }
}

module.exports = UserRegister;
