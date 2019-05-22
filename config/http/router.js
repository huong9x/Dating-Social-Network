const Router                    = require('koa-router');
const multer                    = require('koa-multer');
const logginRequiredMiddleware  = require('../Middleware/logginRequiredMiddleware');
const LoginController           = require('../../src/Controller/LoginController');
const NewsfeedController        = require('../../src/Controller/NewsfeedController');
const LogoutController          = require('../../src/Controller/LogoutController');
const ProfileController         = require('../../src/Controller/ProfileController');
const AboutController           = require('../../src/Controller/AboutController');
const FriendsController         = require('../../src/Controller/FriendsController');
const PhotosController          = require('../../src/Controller/PhotosController');
const VideoController           = require('../../src/Controller/VideoController');
const SignupController          = require('../../src/Controller/SignupController');
const PostController            = require('../../src/Controller/PostController');
const CommentController         = require('../../src/Controller/CommentController');
const SettingsController        = require('../../src/Controller/SettingsController');

const storage                   = multer.diskStorage({

                                    destination: function (req, file, cb) {
                                        cb(null, 'uploads/')
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
const settingsController        = new SettingsController();


router
    .get('/login', loginController.getLogin)

    .post('/login', loginController.postLogin)

    .get('/logout', logoutController.getLogout)

    .post('/signup', signupController.postSignup)

    .get('/', (ctx) => ctx.redirect('/newsfeed'))
     
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed)

    .get('/post', logginRequiredMiddleware, postController.viewPost)
    .post('/editPost', logginRequiredMiddleware, postController.editPost)
    .get('/deletePost', logginRequiredMiddleware, postController.deletePost)

    .post('/postStatus', logginRequiredMiddleware, upload.array('file', 10), newsfeedController.postStatus)

    .get('/profile', logginRequiredMiddleware, profileController.getProfile)

    .get('/settings', logginRequiredMiddleware, settingsController.getSettings)

    .post('/editSettings', logginRequiredMiddleware, settingsController.postEditSettings)

    .post('/postComment', logginRequiredMiddleware, commentController.postComment)
    .post('/editComment', logginRequiredMiddleware, commentController.editComment)
    .get('/deleteComment',logginRequiredMiddleware, commentController.deleteComment)

    .get('/about', logginRequiredMiddleware, aboutController.getAbout)
    
    .get('/notifications', logginRequiredMiddleware)
    
    .get('/friends', logginRequiredMiddleware, friendsController.getFriends)

    .get('/friend', logginRequiredMiddleware, friendsController.getFriendRequest)
    
    .get('/photos', logginRequiredMiddleware, photosController.getPhotos)
    
    .get('/videos', logginRequiredMiddleware, videoController.getVideos)
    
    .get('/search/friends:name', logginRequiredMiddleware)

    .get('/404page', logginRequiredMiddleware, aboutController.getNullPage)
    
    .get('/search/people:name', logginRequiredMiddleware)
    
    .get('/mylocation', logginRequiredMiddleware)
    ;

module.exports = router.routes();