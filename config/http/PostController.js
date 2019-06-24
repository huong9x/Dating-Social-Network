const dateTime           = require('date-time');
const Post               = require('../../resources/Post/Post');
const Share              = require('../../resources/Post/Share');
const LikePost           = require('../../resources/LikeService/LikePost');
const UnlikePost         = require('../../resources/LikeService/UnlikePost');
const LikeCountUpdate    = require('../../resources/Post/LikeCountUpdate');
const CommentCountUpdate = require('../../resources/Post/CommentCountUpdate');
const ShareCountUpdate   = require('../../resources/Post/ShareCountUpdate');
const PostContentUpdate  = require('../../resources/Post/PostContentUpdate');


class PostController {

    async viewPost(ctx) {
        try {
            let post          = ctx.request.post;
            let user          = ctx.request.user;
            let userShare     = ctx.profile;
            let comments      = ctx.request.comments;
            let likeExist     = ctx.request.likeExist;
            let findPostOwner = ctx.request.findPostOwner;

            if(!ctx.query.id) {
                return ctx.redirect('/404page');
            }

            if(ctx.query.ref_page == 'like') {
                if(likeExist.length) { return ctx.redirect('/unlike?id=' + ctx.query.id); }
                    else { return ctx.redirect('/like?id=' + ctx.query.id); }
            }
            if(ctx.query.ref_page == 'share') {                
                return ctx.render('postshare.html', { ctx, post, user, userShare });
            }

            if (ctx.query.idcomment) {
                let findCommentOwner = await ctx.commentRepository.findCommentOwner(ctx.session.loggedInUserId, ctx.query.idcomment);
                return ctx.render('postdetail.html', { post, findPostOwner, findCommentOwner, ctx, comments, user, likeExist });            
            } else {            
                return ctx.render('postdetail.html', { post, findPostOwner, ctx, comments, user, likeExist });
            }
        }
        catch(e) {
            console.log(e);
            return ctx.redirect('/404page');
        }
    }

    async editPost(ctx) {
        const {content} = ctx.request.body;
        let editPost = await ctx.postRepository.update(new PostContentUpdate(ctx.session.loggedInUserId, ctx.query.id, content));
        return ctx.redirect('/post?id=' + ctx.query.id, editPost);
    }

    async getPost(ctx, next) {
        ctx.request.post  = await ctx.postDetailFinder.find(ctx.query.id);
        // console.log(ctx.request.post.getUserId())        
        await next();
    }

    async getDataPost(ctx, next) {
        ctx.request.post  = await ctx.postDetailFinder.find(ctx.request.body.post_id);
        await next();
    }

    async getPostOwner(ctx, next) {
        ctx.request.findPostOwner = await ctx.postRepository.findPostOwner(ctx.query.id, ctx.session.loggedInUserId);
        await next();
    }

    async reactionPost(ctx, next) {
        if(ctx.request.reaction == "like") {
            await ctx.likeRepository.reacting(new LikePost(ctx.session.loggedInUserId, ctx.request.body.post_id));
            let like_count = ctx.request.post.getLikeCount() + 1;
            await ctx.postRepository.update(new LikeCountUpdate(ctx.request.body.post_id, like_count));
            ctx.response.body = "like";
        } else if(ctx.request.reaction == "unlike") {
            await ctx.likeRepository.reacting(new UnlikePost(ctx.session.loggedInUserId, ctx.request.body.post_id));
            let like_count = ctx.request.post.getLikeCount() - 1;
            await ctx.postRepository.update(new LikeCountUpdate(ctx.query.id, like_count));
            ctx.response.body = "unlike";
        }
        await next();
    }

    async checkLikeExist(ctx, next) {
        let likeExist = await ctx.likeRepository.likeExist(ctx.session.loggedInUserId, ctx.request.body.post_id);
        if(likeExist.length) {
            ctx.request.reaction = "like";
        } else {
            ctx.request.reaction = "unlike";
        }

        await next();
    }

    async deletePost(ctx) {
        let deletepost = ctx.postRepository.deletePost(ctx.query.id);
        return ctx.redirect('/newsfeed', deletepost);
    }

    async updateCommentNumberUp(ctx, next) {
        let comment_count = ctx.request.post.getCommentCount() + 1;
        await ctx.postRepository.update(new CommentCountUpdate(ctx.query.id, comment_count));
        await next();
    }

    async updateCommentNumberDown(ctx) {
        let comment_count = ctx.request.post.getCommentCount() - 1;
        await ctx.postRepository.update(new CommentCountUpdate(ctx.query.id, comment_count));
        return ctx.redirect('/post?id=' + ctx.query.id);
    }

    async postShare(ctx, next) {
        await ctx.postRepository.create(new Share(ctx.session.loggedInUserId, ctx.request.body.content, ctx.query.id, dateTime()));
        await next();
    }

    async publishNewPost(ctx) {
        let post = await ctx.postRepository.create(new Post(ctx.session.loggedInUserId, ctx.req.body.status, dateTime()));
        console.log(post);
        if(ctx.req.files) {
            let media = ctx.req.files.map(file => ({ post_id: post, user_id: ctx.session.loggedInUserId, file_name: file.filename, file_type: file.mimetype}));
            await ctx.mediaRepository.add(media);
        }        
        return ctx.redirect('/newsfeed');
    }

    async upShareCount(ctx, next) {
        let share_count = ctx.request.post.getShareCount() + 1;
        await ctx.postRepository.update(new ShareCountUpdate(ctx.query.id, share_count));
        await next();
    }
}

module.exports = PostController;