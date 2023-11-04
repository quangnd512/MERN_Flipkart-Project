const express = require('express');

// Chuyển dữ liệu đã được xử lý từ controller
const { signup, signin, requireSignin } = require('../controller/auth');

const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth')

// Khởi tạo routes
const router = express.Router();

router.post('/signin', validateSigninRequest, isRequestValidated, signin);

// Chuyển hướng khi truy cập vào: ../api/signup
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

// router.post('/profile',requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;