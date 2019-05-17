const Router                    = require('koa-router');
const logginRequiredMiddleware  = require('../../Middleware/logginRequiredMiddleware');
const LoginController           = require('../../src/Controller/LoginController');
const NewsfeedController        = require('../../src/Controller/NewsfeedController');
const LogoutController          = require('../../src/Controller/LogoutController');
const ProfileController         = require('../../src/Controller/ProfileController');
const AboutController           = require('../../src/Controller/AboutController');
const FriendsController         = require('../../src/Controller/FriendsController');
const PhotosController          = require('../../src/Controller/PhotosController');
const VideoController           = require('../../src/Controller/VideoController');
const SignupController          = require('../../src/Controller/SignupController');
const AccountController         = require('../../src/Controller/AccountController');
const ChangePasswordController  = require('../../src/Controller/ChangePasswordController');


const router                    = new Router();
const loginController           = new LoginController();
const signupController          = new SignupController();
const logoutController          = new LogoutController();
const newsfeedController        = new NewsfeedController();
const profileController         = new ProfileController();
const aboutController           = new AboutController();
const friendsController         = new FriendsController();
const photosController          = new PhotosController();
<<<<<<< HEAD
const videoController           = new VideoController();
const accountController         = new AccountController();
const changePasswordController  = new ChangePasswordController();
=======
const videoController           = new VideoController(); 
const postController            = new PostController();



>>>>>>> 2eae2ba73f84e14473821e5645483614a016af97

router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)
    .get('/logout', logoutController.getLogout)
    .post('/signup', signupController.postSignup)
    .get('/', (ctx) => {
        console.log(ctx.req.connection.remoteAddress, ctx.res.connection.remoteAddress);
        ctx.redirect('/newsfeed');
    })  
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed)
    
    .post('/postStatus', logginRequiredMiddleware, newsfeedController.postStatus)
    
<<<<<<< HEAD
    .get('/profile', logginRequiredMiddleware, profileController.goProfile)
    .get('/profile/:userid', logginRequiredMiddleware, profileController.getProfile)
=======
    .get('/profile', logginRequiredMiddleware, profileController.getProfile)

    // .get('/settings', logginRequiredMiddleware, settingsController.getSettings)
    // .post('/editSettings', logginRequiredMiddleware, settingsController.postEditSettings)
>>>>>>> 2eae2ba73f84e14473821e5645483614a016af97

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
    
    .get('/videos', logginRequiredMiddleware, videoController.goVideos)
    .get('/videos/:userid', logginRequiredMiddleware, videoController.getVideos)
    
    .get('/account', logginRequiredMiddleware, accountController.getAccount)
    // .get('/changepassword', logginRequiredMiddleware,)
    // .put("/", (ctx) => {
    //     console.log(ctx.request.body);
    //     ctx.redirect('/changepassword');
    // })
    .get('/changepassword', logginRequiredMiddleware, changePasswordController.getChangePassword)
    .post('/changepassword', logginRequiredMiddleware, changePasswordController.postEditChangePassWord)

    .get('/search/friends:name', logginRequiredMiddleware)
    .get('/search/people:name', logginRequiredMiddleware)
    .get('/mylocation', logginRequiredMiddleware)
    ;

module.exports = router.routes();