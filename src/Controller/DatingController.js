const config = require('../../knexfile');
const knex   = require('knex')(config); 

class DatingController {

    async getNewsfeed(ctx) {
        return ctx.render('newsfeed.html', true);
    }

}

module.exports = DatingController;