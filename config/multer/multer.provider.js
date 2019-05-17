const multer = require('koa-multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../views/uploads')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); 
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

module.exports = () => {

}