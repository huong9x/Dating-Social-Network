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

    async getPhotosProfile(user_id) {
        let photos = await this.knex('media')
                                    .select('*')
                                    .where({
                                        user_id   : user_id,
                                        file_type : 'image/jpeg'
                                    })
                                    .orWhere({
                                        user_id   : user_id,
                                        file_type : 'image/png'
                                    });
        return photos.map((photo) => { return new Media(photo) });
    }

    async getVideosProfile(user_id) {
        let videos = await this.knex('media')
                                    .select('*')
                                    .where({
                                        user_id   : user_id,
                                        file_type : 'video/mp4'
                                    })
        return videos.map((video) => { return new Media(video) });
    }

}

module.exports = MediaRepository;