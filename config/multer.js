const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productId = req.params.id;

        if (!fs.existsSync(`./public/products/${productId}`)) {
            fs.mkdirSync(`./public/products/${productId}`);
        }
        cb(null, `public/products/${productId}`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

module.exports = storage;
