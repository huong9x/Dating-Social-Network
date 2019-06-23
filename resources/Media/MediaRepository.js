const Media = require('./Media');

class MediaRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async add(media) {
        return await this.knex('medias').insert(media);
    }

    async find(condition) {
        let medias = await condition.buildSearchQuery(this.knex('medias'));
        return medias.map((media) => new Media(media));
    }

}

module.exports = MediaRepository;
