const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  // res.send(
  //     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  // );

  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
});

router.post('/add-product', (req, res, next) => {
  console.log('req.body: ', req.body);
  products.push({ title: req.body.title, pageTitle: 'Add Product' });
  res.redirect('/');
});

// module.exports = router;

exports.routes = router;
exports.products = products;
