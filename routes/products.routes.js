const Router = require('express');
const multer = require('multer');
const storage = require('../config/multer');
const upload = multer({ storage });
const router = new Router();
const productsController = require('../controllers/products.controller');

router.get('/api/products/:id', productsController.getProduct);
router.get('/api/products', productsController.getAllProducts);
router.post('/api/products', productsController.addProduct);
router.put('/api/products/:id', productsController.updateProduct);
router.delete('/api/products/:id', productsController.deleteProduct);
router.post('/api/products/:id/photos', upload.array('photos'), productsController.photosUpdate);

module.exports = router;