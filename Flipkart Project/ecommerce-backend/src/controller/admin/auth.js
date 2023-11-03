// Lấy data từ models/user
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        // Tìm một email thoả mãn điều kiện
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // Nếu tồn tại thì cho status là 400 và đưa ra thông báo tài khoản đã tồn tại
            return res.status(400).json({
                message: 'Admin already registered'
            });
        }

        /* Lấy dữ liệu từ phương thức POST tương ứng 
            với các const bằng câu lệnh req.body */
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        /* Tạo đối tượng và truyền vào các const tương ứng 
            và với username thì lấy random với role là admin với account là admin */
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
            role: 'admin'
        });
        
        // Lưu data vào database và thông báo nếu nó không lưu được
        const savedUser = await _user.save();
        if (savedUser) {
            return res.status(201).json({
                user: savedUser
            });
        } else {
            return res.status(400).json({
                message: 'Something went wrong'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

exports.signin = async (req, res) => {
    try {
        // Tìm một email thoả mãn điều kiện
        const user = await User.findOne({ email: req.body.email }).exec();

        // Nếu không có user thì sẽ thông báo lỗi
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // So sánh mật khẩu của user
        const isPasswordValid = await user.authenticate(req.body.password) && user.role === 'admin';

        // Nếu không khớp thì thông báo lỗi ra ngoài
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Tạo ra các token cho người dùng bằng jsonwebtoken dùng để xác thực người dùng
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { _id, firstName, lastName, email, role, fullName } = user;
        
        // Phản hồi thông tin người dùng khi thành công
        res.status(200).json({
            token,
            user: {
                _id, firstName, lastName, email, role, fullName
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// exports.requireSignin = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//     next();
// }





