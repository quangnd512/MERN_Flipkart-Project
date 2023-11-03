const express = require('express');

// Chuyển dữ liệu đã được xử lý từ controller
const { signup, signin, requireSignin } = require('../../controller/admin/auth');

// Khởi tạo routes
const router = express.Router();

router.post('/admin/signin', signin);
router.post('/admin/signup', signup);

module.exports = router; 