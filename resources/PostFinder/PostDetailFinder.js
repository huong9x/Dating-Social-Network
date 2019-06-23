const PostRawData   = require('./PostRawData');
const PostMediaData = require('./PostMediaData');
const PostDetail    = require('./PostDetail');
const ShareDetail   = require('./ShareDetail');

class PostDetailFinder {
    constructor(postProvider, mediaProvider) {
        this.postProvider  = postProvider;
        this.mediaProvider = mediaProvider;
    }
    async find(post_id) {
        let postData = await this.postProvider.find(new PostRawData(post_id));
        let share_id = postData[0].getPostShareId();

        if(share_id) {
            let postSharedData  = await this.postProvider.find(new PostRawData(share_id));
            let mediaSharedData = await this.mediaProvider.find(new PostMediaData(share_id));
            return new ShareDetail(postData[0], postSharedData[0], mediaSharedData);
        }

        let mediaData = await this.mediaProvider.find(new PostMediaData(post_id));

        return new PostDetail(postData[0], mediaData);
    }
}

module.exports = PostDetailFinder;