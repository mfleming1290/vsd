const express = require('express')
const parser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = process.env.PORT || 8000;
const app = express();
var multer = require('multer');


const sessionConfig = {
    secret: 'SessionSecret',
    resave: false,
    saveUninitialized: true,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 3600000
    }
};

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(session(sessionConfig));
app.use(cookieParser('asdkjldfjksnasudfh'));
app.use(express.static(path.join(__dirname, 'dist')));

require('./server/config/database');
require('./server/config/seeds');

 app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

app.use('/api/city', require('./server/config/routes/city.routes'));
app.use('/api/ad', require('./server/config/routes/ad.routes'));
app.use('/api/auth', require('./server/config/routes/auth.routes'));
app.use('/api/city', require('./server/config/routes/city.routes'));
app.use('/api/category', require('./server/config/routes/category.routes'));
app.use('/api/states', require('./server/config/routes/state.routes'));
app.use('/uploads', require('./server/config/routes/image.routes'));



app.use(require('./server/config/routes/catch-all.routes'));

app.listen(port, () => console.log(`listening on port ${ port }`));
