const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Tạo ra các trường dữ liệu trong db bằng userSchema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    pofilePicture: {type: String}
}, { timestamps: true });

// Tạo ra một máy ảo để truyền vào password và mã hoá password sau đó mới lưu password đã mã hoá vào db
userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
});

// Hàm này sẽ so sánh mật khẩu và mật khẩu đã được mã hoá được lưu trong db
userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);
// Trong database sẽ tạo một collection tương ứng là User -> users