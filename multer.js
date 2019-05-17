const Koa = require('koa')
const multer = require('koa-multer')
const Router = require('koa-router')
const njProvider     = require('./nunjucks.provider');

const app = new Koa();
const router = new Router();
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

app.use(njProvider());

//路由
router.get('/upload', (ctx) => {
    return ctx.render('index.html');
})
router.post('/upload', upload.array('file',2), async (ctx, next) => {
    console.log(ctx.req.files);
    let a = ctx.req.files.map((file) => file.filename);
    ctx.body = {
        filename: a//返回文件名
    }
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000);