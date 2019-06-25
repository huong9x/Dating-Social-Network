const Router                    = require('koa-router');
const multer                    = require('koa-multer');
const logginRequiredMiddleware  = require('./config/http/Middleware/logginRequiredMiddleware');
const topPanelProfile           = require('./config/http/Middleware/topPanelProfile');
const LoginController           = require('./config/http/LoginController');
const NewsfeedController        = require('./config/http/NewsfeedController');
const LogoutController          = require('./config/http/LogoutController');
const ProfileController         = require('./config/http/ProfileController');
const AboutController           = require('./config/http/AboutController');
const FriendsController         = require('./config/http/FriendsController');
const PhotosController          = require('./config/http/PhotosController');
const VideoController           = require('./config/http/VideoController');
const SignupController          = require('./config/http/SignupController');
const PostController            = require('./config/http/PostController');
const CommentController         = require('./config/http/CommentController');
const NotificationController    = require('./config/http/NotificationController');
const SettingsController        = require('./config/http/SettingsController');

const storage                   = multer.diskStorage({

                                    destination: function (req, file, cb) {
                                        cb(null, './storage/UserFiles/')
                                    },

                                    filename: function (req, file, cb) {
                                        var fileFormat = (file.originalname).split(".");
                                        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
                                    }
                                    })

const upload                    = multer({ storage: storage });

const router                    = new Router();
const loginController           = new LoginController();
const signupController          = new SignupController();
const logoutController          = new LogoutController();
const newsfeedController        = new NewsfeedController();
const profileController         = new ProfileController();
const aboutController           = new AboutController();
const friendsController         = new FriendsController();
const photosController          = new PhotosController();
const videoController           = new VideoController(); 
const postController            = new PostController();
const commentController         = new CommentController();
const notificationController    = new NotificationController();
const settingsController        = new SettingsController();


router
    .get('/login', loginController.getLogin)

    .post('/login', loginController.postLogin)

    .get('/logout', logoutController.getLogout)

    .post('/signup', signupController.postSignup)

    .get('/', (ctx) => ctx.redirect('/newsfeed'))
     
    .get('/newsfeed', logginRequiredMiddleware, topPanelProfile, profileController.getUserFriend, newsfeedController.getNewsfeed)

    .get('/post',
        logginRequiredMiddleware,
        topPanelProfile,
        postController.getPost,
        commentController.getPostComment,
        postController.checkLikeExist,
        postController.getPostOwner,
        postController.viewPost
    )
    .post('/editPost', logginRequiredMiddleware, postController.editPost)
    .get('/deletePost', logginRequiredMiddleware, postController.deletePost)

    .post('/like',
        logginRequiredMiddleware,
        postController.checkLikeExist,
        postController.getDataPost,
        postController.reactionPost,
        notificationController.notifyNewReaction
    )

    .post('/publishNewPost', logginRequiredMiddleware, upload.array('file', 100), postController.publishNewPost)

    .get('/profile',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.getProfileInfo,
        profileController.IsFriendCheck,
        profileController.getUserPosts,
        photosController.getProfilePhoto,
        photosController.getLastPhotos,
        profileController.getListFriend,
        profileController.getProfile
    )

    .post('/updateProfileAvatar',
        logginRequiredMiddleware,
        topPanelProfile,
        upload.single('avatar'),
        profileController.updateProfileAvatar
    )

    .post('/updateProfileCover', logginRequiredMiddleware, topPanelProfile, upload.single('file'), profileController.updateProfileCover)

    .get('/settings', logginRequiredMiddleware, topPanelProfile, settingsController.getSettings)

    .post('/editSettings', logginRequiredMiddleware, topPanelProfile, settingsController.postEditSettings)

    .post('/postComment',
        logginRequiredMiddleware,
        commentController.postComment,
        postController.getPost,
        postController.updateCommentNumberUp,
        notificationController.notifyNewComment
    )


    .post('/editComment', logginRequiredMiddleware, commentController.editComment)

    .get('/deleteComment',
        logginRequiredMiddleware,
        commentController.deleteComment,
        postController.getPost,
        postController.updateCommentNumberDown
    )

    .post('/share',
        logginRequiredMiddleware,
        postController.postShare,
        postController.getPost,
        postController.upShareCount,
        notificationController.notifyNewShare
    )

    .get('/about',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.getProfileInfo,
        profileController.IsFriendCheck,
        aboutController.getAbout
    )
    
    .get('/notifications', logginRequiredMiddleware, topPanelProfile)
    
    .get('/friends',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.getProfileInfo,
        profileController.IsFriendCheck,
        profileController.getListFriend,
        friendsController.getFriends
    )

    .get('/friend', logginRequiredMiddleware, topPanelProfile, friendsController.getFriendRequest)
    
    .get('/photos',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.getProfileInfo,
        profileController.IsFriendCheck,
        photosController.getProfilePhoto,
        photosController.getPhotos
    )
    
    .get('/videos',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.getProfileInfo,
        profileController.IsFriendCheck,
        videoController.getProfileVideo,
        videoController.getVideos
    )

    .get('/404page', logginRequiredMiddleware, topPanelProfile, aboutController.getNullPage)
    
    .get('/changepassword', logginRequiredMiddleware, topPanelProfile, profileController.getChangePassword)

    .post('/changepassword', logginRequiredMiddleware, topPanelProfile, profileController.postChangePassword)
    
    .get('/search',
        logginRequiredMiddleware,
        topPanelProfile,
        profileController.searchUser
    )
            
    .get('/searchnearby', logginRequiredMiddleware, topPanelProfile, profileController.searchNearBy)

    .post('/report', logginRequiredMiddleware, profileController.reportUser)

    .get('/notifications', logginRequiredMiddleware, topPanelProfile, notificationController.getNotifications)
    .get('/markAsRead', logginRequiredMiddleware, topPanelProfile, notificationController.markAsRead)
    .get('/markAllAsRead', logginRequiredMiddleware, topPanelProfile, notificationController.markAllAsRead)
    .get('/deleteNotification', logginRequiredMiddleware, topPanelProfile, notificationController.deleteNotification)

    ;

module.exports = router.routes();