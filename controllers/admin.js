const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // req.user
  //   .createProduct({
  //     title,
  //     price,
  //     imageUrl,
  //     description,
  //   })
  //   .then(result => {
  //     console.log('Created product!');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));

  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      console.log('Created product!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  console.log('HERE');
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const prodId = req.params.productId;
  console.log('prodId: ', prodId);
  // req.user
  //   .getProducts({ where: { id: prodId }, raw: true })
  //   .then(product => {
  //     if (!product) return res.redirect('/');
  //     res.render('./admin/edit-product', {
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: editMode,
  //       product: product[0],
  //     });
  //   })
  //   .catch(err => console.log(err));
  // Product.findByPk(prodId)
  //   .then(({ dataValues }) => {
  //     if (!dataValues) return res.redirect('/');
  //     res.render('./admin/edit-product', {
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: editMode,
  //       product: dataValues,
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      if (!product) return res.redirect('/');
      res.render('./admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // Product.update(
  //   {
  //     title: updatedTitle,
  //     price: updatedPrice,
  //     description: updatedDesc,
  //     imageUrl: updatedImageUrl,
  //   },
  //   { where: { id: prodId } }
  // )
  //   .then(result => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  console.log('getProducts');
  // req.user
  //   .getProducts({ raw: true })
  //   .then(products => {
  //     res.render('admin/products', {
  //       products: products,
  //       pageTitle: 'Admin Products',
  //       path: '/admin/products',
  //     });
  //   })
  //   .catch(err => console.log(err));
  // Product.findAll()
  //   .then(products => {
  //     res.render('admin/products', {
  //       products: products,
  //       pageTitle: 'Admin Products',
  //       path: '/admin/products',
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.fetchAll()
    .then(products => {
      // console.log(products);
      res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByPk(prodId)
  //   .then(product => product.destroy())
  //   .then(result => {
  //     console.log(result);
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));
  Product.deleteById(prodId)
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
