const fs = require('fs');
const knex = require('../config/knex');
const Joi = require('joi');

const productModel = Joi.object({
  name: Joi.string()
    .max(255)
    .required(),

  price: Joi.number()
    .integer(),

  stock: Joi.number()
    .integer(),
});

class Product {
  getProduct(productId) {
    return new Promise(async (resolve, reject) => {
    const product = await knex.select('*').where('id', '=', productId).first().from('products');

    if (!product) {
      const err = new Error('Product not found');

      return reject(err.message);
    }

    resolve(product);
  });
  }
  getAllProducts(page = 1, limit = 10) {
    return new Promise(async (resolve, reject) => {
      const products = await knex.select('*')
        .limit(limit)
        .offset((page - 1) * limit)
        .from('products');
      const totalProducts = await knex('products').count('id');

      if (!products.length) {
        const err = new Error('No products found');

        return reject(err.message);
      }

      const totalPages = Math.ceil(Number(totalProducts[0].count) / limit);
      const productsData = {
        items: [...products],
        totalItems: totalProducts[0].count,
        currentPage: page,
        totalPages,
      };

      resolve(productsData);
    });
  }
  addProduct(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        await productModel.validateAsync(productData);
      }
      catch (err) {
        const error = new Error('Validation error');

        return reject(error.message);
      }

      const product = await knex('products').returning('*').insert(productData);

      resolve(product);
    });
  }
  updateProduct(productId, productData) {
    return new Promise(async (resolve, reject) => {
      try {
        await productModel.validateAsync(productData);
      }
      catch (err) {
        const error = new Error('Validation error');

        return reject(error.message);
      }

      const updatedProduct = await knex('products').returning('*').where('id', '=', productId).update({
        ...productData,
        thisKeyIsSkipped: undefined
      });

      if (!updatedProduct.length) {
        const err = new Error('Product not found');

        return reject(err.message);
      }

      resolve(updatedProduct);
    });
  }
  deleteProduct(productId) {
    return new Promise(async (resolve, reject) => {
      const product = await knex('products').returning('*').where('id', productId).del();

      if (!product.length) {
        const err = new Error('Product not found');

        reject(err.message);
      }

      if (fs.existsSync(`./public/products/${productId}`)) {
        fs.rmSync(`./public/products/${productId}`, { recursive: true });
      }

      resolve(product);
    });
  }
}

module.exports = new Product();
