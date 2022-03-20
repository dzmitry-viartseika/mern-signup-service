require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const multer = require('multer');
const errorMiddleWare = require('./middleware/error-middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const passport = require('passport');
const axios = require('axios');
const authRoute = require("./routers/auth-google");
const swaggerDoc = require('swagger-ui-express');
const fileRoutes = require('./routers/file-upload-routes');
const swaggerDocumentation = require('./helper/documentations');
const cookieSession = require('cookie-session');
require('./config/passport');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(express.json({extended: true}));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use('/auth', authRoute);
// подключаем в самом конце
app.use(errorMiddleWare);

app.get('/api/getuser', (req, res) => {
    res.send(req.user);
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/documentations', swaggerDoc.serve);
app.use('/documentations', swaggerDoc.setup(swaggerDocumentation));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection, collectionName: 'sessions' }),
}))

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get("/api/success",isLoggedIn, (req, res) => {
    console.log('req.user successsuccesssuccess', req.user);
    res.send({
        message: 'wertey  sucecess',
        user: req.user,
    })
})

app.get('/auth/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('http://localhost:8080/success')
    }
);

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.use('/api', fileRoutes.routes);
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
