const express = require('express');
const productsRouter = require('./routes/products.routes');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(productsRouter);

app.listen(4000, () => {
    console.log('Web server started')
  });