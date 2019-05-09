const bcrypt              = require('bcrypt');
const BcryptHasherAdapter = require('./hasher');

module.exports = (round) => {
    return async (ctx, next) => {
        let adapter = new BcryptHasherAdapter(bcrypt);

        adapter.setRound(round);
        ctx.hasher = adapter;

        await next();
    }
}
