const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('__dirname: ', __dirname);
    // const pathJoin = path.join(__dirname, 'views', 'shop.html');
    // console.log('pathJoin: ', pathJoin);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;