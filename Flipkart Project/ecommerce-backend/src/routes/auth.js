const express = require('express');

// Chuyển dữ liệu đã được xử lý từ controller
const { signup, signin, requireSignin } = require('../controller/auth');

// Khởi tạo routes
const router = express.Router();

router.post('/signin', signin);

// Chuyển hướng khi truy cập vào: ../api/signup
router.post('/signup', signup);

// router.post('/profile',requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;