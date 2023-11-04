const express = require('express');

// Chuyển dữ liệu đã được xử lý từ controller
const { signup, signin, requireSignin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth')

// Khởi tạo routes
const router = express.Router();

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

module.exports = router; 