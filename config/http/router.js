const Router                    = require('koa-router');
const multer                    = require('koa-multer');
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
const PostController            = require('../../src/Controller/PostController');
const SettingsController        = require('../../src/Controller/SettingsController');

const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

//加载配置
const upload = multer({ storage: storage });

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
const settingsController        = new SettingsController();

router
    .get('/login', loginController.getLogin)

    .post('/login', loginController.postLogin)

    .get('/logout', logoutController.getLogout)

    .post('/signup', signupController.postSignup)

    .get('/', (ctx) => ctx.redirect('/newsfeed'))
     
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed)

    .get('/post', logginRequiredMiddleware, postController.viewPost)
    .get('/upload', async (ctx, next) => {
      ctx.render('index.html', true);
      await next();
    })
    .post('/upload', upload.array('file',2), (ctx, next) => {
      console.log(ctx.req.files);
      let a = ctx.req.files.map((file) => file.filename);
      ctx.body = {
          filename: a//返回文件名
      }
    })
    .post('/postStatus', logginRequiredMiddleware, upload.array('file', 3), async (ctx, next) => {
        // const {status} = ctx.request.body;
        // console.log(status);
        console.log(ctx.req.files);
        let a = ctx.req.files.map((file) => file.filename);
        ctx.body = {
          filename: a//返回文件名
      }
        await next();

    })
    
    .get('/profile', logginRequiredMiddleware, profileController.getProfile)

    .get('/settings', logginRequiredMiddleware, settingsController.getSettings)
    .post('/editSettings', logginRequiredMiddleware, settingsController.postEditSettings)

    .get('/about', logginRequiredMiddleware, aboutController.getAbout)
    
    .get('/notifications', logginRequiredMiddleware)
    
    .get('/friends', logginRequiredMiddleware, friendsController.getFriends)
    
    .get('/photos', logginRequiredMiddleware, photosController.getPhotos)
    
    .get('/videos', logginRequiredMiddleware, videoController.getVideos)
    
    .get('/search/friends:name', logginRequiredMiddleware)
    .get('/search/people:name', logginRequiredMiddleware)
    
    .get('/mylocation', logginRequiredMiddleware)
    ;

module.exports = router.routes();