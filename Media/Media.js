class Media {
    constructor(media_id, post_id, filename){
        this.media_id = media_id;
        this.post_id  = post_id;
        this.filename = filename;
    }

    getMediaId() {
        return this.media_id;
    }
    getPostId() {
        return this.post_id;
    }
    getFilename() {
        return this.filename;
    }

}

module.exports = Media;
