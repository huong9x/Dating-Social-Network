const Media = require('./Media');

class MediaRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async addMedia(media) {        
        return await this.knex('media').insert(media);
    }
    
    async getLastPhotos(user_id) {
        let photos     = await this.knex('media').count({ count: 'user_id' });
        if(photos[0].count < 10) {
        let lastPhotos = await this.knex.select('*').from('media').where('user_id', user_id).andWhere('file_type', 'like', 'image/%').orderBy('media_id', 'desc');
        return lastPhotos.map((photo) => {
            return new Media(photo);
        });
        }
        let lastPhotos = await this.knex.select('*').from('media').where('user_id', user_id).andWhere('file_type', 'like', 'image/%').limit(9).offset(photos[0].count - 9);
        return lastPhotos.map((photo) => new Media(photo));
    }

}

module.exports = MediaRepository;
