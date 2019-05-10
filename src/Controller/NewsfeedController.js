const config = require('../../knexfile');
const knex   = require('knex')(config); 

class NewsfeedController {

    async getNewsfeed(ctx) {
        return ctx.render('newsfeed.html', true);
    }

}

module.exports = NewsfeedController;