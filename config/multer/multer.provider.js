const multer  = require('koa-multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../views/uploadedFiles')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); 
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

module.exports = () => {
    
    return async(context, next) => {
        context.upload = () => {
            context.upload = multer({ storage: storage });
        }
        await next();
    };
};