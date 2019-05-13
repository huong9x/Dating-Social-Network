const Router                    = require('koa-router');
const logginRequiredMiddleware  = require('../../Middleware/logginRequiredMiddleware');
const LoginController           = require('../../src/Controller/LoginController');
const NewsfeedController        = require('../../src/Controller/NewsfeedController');
const LogoutController          = require('../../src/Controller/LogoutController');
const ProfileController         = require('../../src/Controller/ProfileController');
const AboutController           = require('../../src/Controller/AboutController');
const FriendsController         = require('../../src/Controller/FriendsController');
const VideoController           = require('../../src/Controller/VideoController');

const router                    = new Router();
const loginController           = new LoginController();
const logoutController          = new LogoutController();
const newsfeedController        = new NewsfeedController();
const profileController         = new ProfileController();
const aboutController           = new AboutController();
const friendsController         = new FriendsController();
const videoController           = new VideoController();


router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)
    .get('/logout', logoutController.getLogout)
    .post('/signup', () => {
        ctx.body = {message: signup};
    }) 
    .get('/', (ctx) => ctx.redirect('/newsfeed'))  
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed)
    
    .post('/postStatus', logginRequiredMiddleware, newsfeedController.postStatus)
    
    .get('/profile', logginRequiredMiddleware, profileController.goProfile)
    .get('/profile/:userid', logginRequiredMiddleware, profileController.getProfile)

    .get('/about', logginRequiredMiddleware, aboutController.goAbout)
    .get('/about/:userid', logginRequiredMiddleware, aboutController.getAbout)
    
    .get('/notifications', logginRequiredMiddleware)
    
    .get('/friends', logginRequiredMiddleware, friendsController.goFriends)
    .get('/friends/:userid', logginRequiredMiddleware, friendsController.getFriends)
    .get('/friends/requests', logginRequiredMiddleware)
    .get('/friends/requests/accept', logginRequiredMiddleware)
    .get('/friends/requests/reject', logginRequiredMiddleware)
    .get('/friends/requests', logginRequiredMiddleware)
    
    .get('/photos', logginRequiredMiddleware)
    
    .get('/videos', logginRequiredMiddleware, videoController.goVideos)

    .get('/videos/:userid', logginRequiredMiddleware, videoController.getVideos)

    
    .get('/search/friends:name', logginRequiredMiddleware)
    .get('/search/people:name', logginRequiredMiddleware)
    .get('/mylocation', logginRequiredMiddleware)
    ;

module.exports = router.routes();