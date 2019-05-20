const Media = require('./Media');

class MediaRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async addMedia(media) {
        let medias = await this.knex('media').insert(media);
        console.log(medias);
        return new Media(medias);

    }
}

module.exports = MediaRepository;
