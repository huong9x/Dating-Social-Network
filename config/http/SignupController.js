const UserRegister = require('../../resources/User/UserRegister');

class SignupController {

    async postSignup(ctx) {
        const {first_name, last_name, email, birth_date, gender, username, password} = ctx.request.body;

        try {
            if(await ctx.userRepository.findByUsername(username)) {
                throw new Error('Username "' + username + '" is already taken')
            }
            let user = await ctx.userRepository.add(
                        new UserRegister(
                                username,
                                await ctx.hasher.generate(password),
                                first_name,
                                last_name,
                                email,
                                birth_date,
                                gender
                                ));
            await ctx.authenticator.login(user);
            return ctx.redirect('/settings');        

        } catch (e) {
            console.log(e.message);
            return ctx.redirect('/settings');
        };    

        
    }
}

module.exports = SignupController;