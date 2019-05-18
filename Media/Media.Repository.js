const Media = require('./Media');

class MediaRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async findMedia(post_id) {
        let medias = this.knex.select('*').from('media').where('post_id', post_id);
        return new Media();
    }
    async addMedia(media) {
        let medias = await this.knex('media').insert(media);
        console.log(medias);
        return new Media(medias);

    }
}

module.exports = MediaRepository;
