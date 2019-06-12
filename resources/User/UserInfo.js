const capitalize = require('capitalize-first-letter');
class UserInfo {
    constructor(rawUser) {
        this.user_id         = rawUser.user_id;
        this.first_name      = rawUser.first_name;
        this.last_name       = rawUser.last_name;
        this.birth_date      = rawUser.birth_date;
        this.gender          = rawUser.gender;
        this.email           = rawUser.email;
        this.relationship    = rawUser.relationship;
        this.user_avatar     = rawUser.user_avatar;
        this.phone_number    = rawUser.phone_number;
        this.address         = rawUser.address;
        this.password        = rawUser.password;
        this.follower_status = rawUser.follower_status;
        this.user_avatar     = rawUser.user_avatar;
        this.user_cover      = rawUser.user_cover;
    }

    getUserId() {
        return this.user_id;
    }
    getUserPassword() {
        return this.password;
    }
    getName() {
        return capitalize(this.first_name);
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getPresentationName() {
        return capitalize(this.first_name + ' ' + this.last_name);
    }
    getBirthDate() {
        return this.birth_date.toISOString().split("T")[0];
    }
    getGender() {
        return this.gender;
    }
    getEmail() {
        return this.email;
    }
    getRelationship () {
        return this.relationship;
    }
    getUserAvatar() {
        return '/uploadedFiles/' + this.user_avatar;        
    }
    getUserCover() {
        return '/uploadedFiles/' + this.user_cover;
    }
    getPhoneNumber() {
        return this.phone_number;
    }
    getAddress() {
        return this.address;
    }
    getExistAvatar() {
        return this.user_avatar;
    }
    getDefaultAvatar() {
        return 'img/default-user.png';
    }
    getFollowerStatus() {
        return this.follower_status;
    }
}

module.exports = UserInfo;
