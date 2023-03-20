const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) cb([]);
    else cb(JSON.parse(fileContent.toString()));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log('error: ', err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};