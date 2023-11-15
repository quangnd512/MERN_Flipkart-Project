const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRouters = require('./routes/category');
const productRouters = require('./routes/product');


env.config();

// mongodb connect
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.n7lirtr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    { 
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database connected');
});

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);

// Chuyển hướng đến category routes
app.use('/api', categoryRouters);
app.use('/api', productRouters);

app.listen(process.env.PORT, () => {
    console.log(`Port: ${process.env.PORT}`);
});