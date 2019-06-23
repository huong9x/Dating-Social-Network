class ShareDetail {
    constructor(postData, postSharedData, mediaSharedData) {
        this.postData        = postData;
        this.postSharedData  = postSharedData;
        this.mediaSharedData = mediaSharedData;
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
        return this.postData.getPostShareId();
    }
    getPostMedia() {
        return null;
    }

    getSharedUserId() {
        return this.postSharedData.getUserId();
    }
    getSharedUserAvatar() {
        return this.postSharedData.getUserAvatar();
    }
    getSharedUserPresentationName() {
        return this.postSharedData.getUserPresentationName();
    }
    getSharedContent() {
        return this.postSharedData.getContent();
    }
    getSharedPostTime() {
        return this.postSharedData.getPostTime();
    }
    getSharedRawPostTime() {
        return this.postSharedData.getRawPostTime();
    }
    getSharedPostMedia() {
        return this.mediaSharedData;
    }
}

module.exports = ShareDetail;
