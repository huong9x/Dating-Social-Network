class Media {
    constructor(media){
        this.media_id = media.media_id;
        this.post_id  = media.post_id;
        this.filename = media.filename;
        this.filetype = media.file_type;
    }

    getMediaId() {
        return this.media_id;
    }
    getPostId() {
        return this.post_id;
    }
    getFilename() {
        return '/uploadedFiles/' + this.filename;        
    }
    getFiletype() {
        return this.filetype;
    }

}

module.exports = Media;
