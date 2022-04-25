require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const errorMiddleWare = require('./middleware/error-middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const http = require('http');
const graphQLDepthLimit = require('graphql-depth-limit');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema.js');
const resolver = require('./graphql/resolver.js');
const passport = require('passport');
const axios = require('axios');
const authRoute = require("./routers/auth-google");
const swaggerDoc = require('swagger-ui-express');
const fileRoutes = require('./routers/file-upload-routes');
const swaggerDocumentation = require('./helper/documentations');
const cookieSession = require('cookie-session');
const allowedOrigins = ['http://localhost:5000', 'http://localhost:8080'];
require('./config/passport');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
// const io = require('socket.io').listen(server);

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))
app.use(express.json({extended: true}));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(cors());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
    // origin: function(origin, callback){
    //     // allow requests with no origin
    //     // (like mobile apps or curl requests)
    //     if(!origin) return callback(null, true);
    //     if(allowedOrigins.indexOf(origin) === -1){
    //         const msg = 'The CORS policy for this site does not ' +
    //             'allow access from the specified Origin.';
    //         return callback(new Error(msg), false);
    //     }
    //     return callback(null, true);
    // }
}));
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    validationRules: [graphQLDepthLimit(3)],
}))
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
    secret: process.env.SECRET_SESSION,
    key: 'key', // naming
    resave: true,
    saveUninitialized: true,
    cookie: {
        // path: '/', // кука по определенным роутам / по всему сайту
        // httponly: true, // только браузер и ко мне на фронте не читать
        // maxAge: null, // null - бесконечно живет
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

app.get("/api",isLoggedIn, (req, res) => {
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
        res.redirect('http://localhost:8080/')
    }
);

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

const io = require('socket.io')(server, {
    cors: {
        origins: [
            "http://localhost:5000",
        ],
        credentials: true
    },
});

io.on('connection', (socket) => {
    socket.on('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        console.log('data', data);
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });
});

// io
//     .sockets
//     .on('connection', function (socket) {
//         console.log('User connected socket', socket.id);
//
//         socket.on('disconnect', () => {
//             console.log(`User ${socket.id} left`)
//         })
//
//         socket.on('my message', (msg) => {
//             console.log('message: ' + msg);
//         });
//         // socket.emit("hello", "world");
//         // socket.send({
//         //     type: 'hello',
//         //     message: 'Hello my friend. Im Socket IO'
//         // })
//        // socket.on('message', message => {
//        //     socket.send({
//        //         type: 'message',
//        //         message: message
//        //     });
//        //     socket
//        //         .setBroadcast.send({
//        //         type: 'message',
//        //         message: message
//        //     })
//        // })
//        // socket.on('disconnect', (data) => {
//        //     console.log('disconnect');
//        // });
//
//         // там походу схема на один ивент закидываешь с фронта объект например, записываешь его в базу,
//         //     и потом достаешь уже обновленные объекты из базы и эмитишь другой ивент их отдаешь, и
//         // на фронте где подписался на него там обновляешь ui новыми объектами
//     }
// )


app.use('/api', fileRoutes.routes);
const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
        })
        server.listen(PORT, () => {
            console.log(`Backend is running on the ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

startApp();
