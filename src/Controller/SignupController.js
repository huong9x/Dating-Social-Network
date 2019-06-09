const SearchByUsername = require('../../resources/User/SearchByUsername');

class SignupController {

    async postSignup(ctx, next) {
        const {first_name, last_name, email, birth_date, gender, username, password} = ctx.request.body;
        console.log(ctx.request.body);
        if(await ctx.userRepository.searchUser(new SearchByUsername(username))) {
            throw new Error('Username "' + username + '" is already taken')
        }
        let user = await ctx.authenticator.register(await ctx.userRepository.addUser(username, await ctx.hasher.generate(password), first_name, last_name, email, birth_date, gender));
        console.log(user);
        // await ctx.authenticator.register(user);
        return ctx.redirect('/settings');
    }
}

module.exports = SignupController;