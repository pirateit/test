const Product = require('../models/product');

class ProductsController {
  getProduct(req, res) {
    const productId = req.params.id;

    Product.getProduct(productId)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }
  getAllProducts(req, res) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    Product.getAllProducts(page, limit)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.send(data);
      });
  }
  addProduct(req, res) {
    const productData = req.body;

    Product.addProduct(productData)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }
  updateProduct(req, res) {
    const productData = req.body;
    const productId = req.params.id;

    Product.updateProduct(productId, productData)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }
  deleteProduct(req, res) {
    const productId = req.params.id;

    Product.deleteProduct(productId)
      .then(data => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.send(err);
      });
  }
  photosUpdate(req, res) {
    res.sendStatus(201);
  }
}

module.exports = new ProductsController();
