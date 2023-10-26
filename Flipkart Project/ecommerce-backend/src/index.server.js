const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');


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

app.use(bodyParser());
// express.json()
app.use('/api', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Port: ${process.env.PORT}`);
});