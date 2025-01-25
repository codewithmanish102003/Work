const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/index');

const db = require('./config/mongoose_connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'default_secret',
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Base Router
app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});