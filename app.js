var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
passport dependencies put right beneath here

*/

var expressSession = require('express-session');//passport
var passport = require('passport'); //passport
var LocalStrategy = require('passport-local').Strategy //passport


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'hello_kitty_30r9203', saveUninitialized: false, resave: false}));//passport

app.use(passport.initialize());//passport
app.use(passport.session());//passport

app.use((req,res,next)=>{//passport
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
});


app.use('/', index);
app.use('/users', users);




passport.use('local.signin',new LocalStrategy(
	function(uname, pwd, done) {

		/*put the db function here*/
		if (uname == 'Ali' && pwd == '12345'){

			return done(null,{serialized:43});
			
		}else{

			done(null,false);

		}
	}
));
passport.use('local.signup',new LocalStrategy(
	function(uname, pwd, done) {

		/*put the db function here*/
		if (uname == 'Ali' && pwd == '123456'){

			return done(null,{serialized:'Ali'});
			
		}else{

			done(null,false);

		}
	}
));










// catch 404 and forward to error handler
app.use(function(req, res, next) {
	/*var err = new Error('Not Found');
	err.status = 404;
	next(err);*/
	res.send('');

});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  

res.locals.message = err.message;
  
res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
res.status(err.status || 500);
  

res.json({
message: err.message,
error: req.app.get('env') === 'development' ? err : {}
});




});

module.exports = app;
