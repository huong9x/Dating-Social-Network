class BcryptHasherAdapter { 
    constructor(bcrypt) {
        this.bcrypt = bcrypt;
    }

    setRound(round) {
        this.round = round;
    }

    async generate(value) {
        return await this.bcrypt.hash(value, this.round);
    }

    async check(value, hashed) {
        return await this.bcrypt.compare(value, hashed);
    }
}

module.exports = BcryptHasherAdapter;
