const express = require('express');
const { addCategory, getCategory } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();

//create category nếu là admin
router.post('/category/create', requireSignin, adminMiddleware, addCategory);

//get category ra ngoài
router.get('/category/getcategory', getCategory);

module.exports = router;