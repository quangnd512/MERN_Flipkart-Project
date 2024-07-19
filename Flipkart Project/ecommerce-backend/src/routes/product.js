const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const {createProduct } = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    //Xác định thư mục tải lên
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },

    //Xác định tên mới sau khi tải
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({ storage });

// upload.array('productPicture') sẽ upload ảnh vào trường productPicture trong database
router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);

module.exports = router;