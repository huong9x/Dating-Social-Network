const Router                    = require('koa-router');
const logginRequiredMiddleware  = require('../../Middleware/logginRequiredMiddleware');
const LoginController           = require('../../src/Controller/LoginController');
const NewsfeedController        = require('../../src/Controller/NewsfeedController');
const LogoutController          = require('../../src/Controller/LogoutController');
const ProfileController         = require('../../src/Controller/ProfileController');
const AboutController           = require('../../src/Controller/AboutController');
const FriendsController         = require('../../src/Controller/FriendsController');
const PhotosController         = require('../../src/Controller/PhotosController');

const router                    = new Router();
const loginController           = new LoginController();
const logoutController          = new LogoutController();
const newsfeedController        = new NewsfeedController();
const profileController         = new ProfileController();
const aboutController           = new AboutController();
const friendsController         = new FriendsController();
const photosController         = new PhotosController();


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
    
    .get('/photos', logginRequiredMiddleware, photosController.goPhotos)
    .get('/photos/:userid', logginRequiredMiddleware, photosController.getPhotos)
    
    .get('/videos', logginRequiredMiddleware)
    
    .get('/search/friends:name', logginRequiredMiddleware)
    .get('/search/people:name', logginRequiredMiddleware)
    .get('/mylocation', logginRequiredMiddleware)
    ;

module.exports = router.routes();