class FindLastPhotosByUserId {
    constructor(user_id, photo_count) {
        this.user_id     = user_id;
        this.photo_count = photo_count;
    }
    buildSearchQuery(query) {
        return query.select('*')
                    .from('medias')
                    .where('user_id', this.user_id)
                    .andWhere('file_type', 'like', 'image/%')
                    .limit(9)
                    .offset(this.photo_count - 9);
    }
}

module.exports = FindLastPhotosByUserId;
