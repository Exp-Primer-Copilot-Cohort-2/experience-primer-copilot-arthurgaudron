// create web server
// npm install express
// npm install body-parser
// npm install cookie-parser
// npm install express-session
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// create web server
var app = express();
app.listen(3000, function(){
    console.log('Server is running...');
});
// use body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
// use cookie-parser middleware
app.use(cookieParser());
// use express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
// use static middleware
app.use(express.static('public'));
// use view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// routing
app.get('/comment', function(req, res){
    res.render('comment');
});
app.post('/comment', function(req, res){
    var comment = req.body.comment;
    console.log('Comment: ' + comment);
    res.render('comment');
});