const express = require('express');
const dotenv = require('dotenv');
const path=require('path')
dotenv.config();
const CoonDB=require('./config/db')
const userRoutes = require('./routes/user.routes');
const indexRoutes = require('./routes/index.routes');

CoonDB() 

const cookieParser=require("cookie-parser")
const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/user', userRoutes);
app.use('/', indexRoutes);

app.get('/', (req, res, next) => {
    res.render('index', (err, html) => {
        if (err) {
            next(err);
        } else {
            res.send(html);
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});