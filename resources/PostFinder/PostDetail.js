class PostDetail {
    constructor(postData, mediaData) {
        this.postData  = postData;
        this.mediaData = mediaData;
    }

    getPostId() {
        return this.postData.getPostId();
    }
    getUserId() {
        return this.postData.getUserId();
    }
    getUserAvatar() {
        return this.postData.getUserAvatar();
    }
    getUserPresentationName() {
        return this.postData.getUserPresentationName();
    }
    getContent() {
        return this.postData.getContent();
    }
    getLikeCount() {
        return this.postData.getLikeCount();
    }
    getCommentCount() {
        return this.postData.getCommentCount();
    }
    getShareCount() {
        return this.postData.getShareCount();
    }
    getPostTime() {
        return this.postData.getPostTime();
    }
    getRawPostTime() {
        return this.postData.getRawPostTime();
    }
    getPostShareId() {
        return null;
    }
    getPostMedia() {
        return this.mediaData;
    }
}

module.exports = PostDetail;
