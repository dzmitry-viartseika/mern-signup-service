require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const multer = require('multer');
const errorMiddleWare = require('./middleware/error-middleware');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({extended: true}));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
// подключаем в самом конце
app.use(errorMiddleWare);

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`Backend is running on the ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

startApp();
