class Media {
    constructor(media){
        this.media_id = media.id;
        this.post_id  = media.post_id;
        this.file_name = media.file_name;
        this.filetype = media.file_type;
    }

    getMediaId() {
        return this.media_id;
    }
    getPostId() {
        return this.post_id;
    }
    getFilename() {
        return '/UserFiles/' + this.file_name;        
    }
    getFiletype() {
        return this.filetype;
    }

}

module.exports = Media;
