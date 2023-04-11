const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products =>
      res.render('./shop/product-list', {
        products: products,
        pageTitle: 'All Products',
        path: '/products',
      })
    )
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId, { raw: true })
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).render('404', { pageTitle: 'Page Not Found', path: '' });
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll({ raw: true })
    .then(products =>
      res.render('./shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/',
      })
    )
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => cart.getProducts())
    .then(products =>
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'You Cart',
        products: products,
      })
    )
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) product = products[0];
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product =>
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    )
    .then(res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => cart.getProducts({ where: { id: prodId } }))
    .then(products => products[0].cartItem.destroy())
    .then(res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products =>
      req.user
        .createOrder()
        .then(order =>
          order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          )
        )
        .catch(err => console.log(err))
    )
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect('/orders'))
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      console.log('orders: ', orders);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (_req, res, next) => {
  res.render('/shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
