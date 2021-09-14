const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})



const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
        return cb(new Error('Only csvs are allowed'));
    }
    cb(null, true);
}

module.exports = {storage, fileFilter};