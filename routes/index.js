var express = require('express');
var router = express.Router();
var passport = require('passport');

/*  */

const midWAuth = (req,res,next)=>{

	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/login');
	};

};


router.get('/', midWAuth ,(req,res,next)=>{

	res.render('index',{title:'Welcome to Home page'});
});

router.get('/profile', midWAuth ,(req,res,next)=>{
	res.render('index');
});

router.get('/login',(req,res,next)=>{
	res.render('login');
});
router.post('/login',passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/login'
}));

router.get('/logout',(req,res,next)=>{
	req.logout();
	req.session.destroy();
	res.redirect('/login');
});



passport.serializeUser((user_id, done)=> { 	done(null, user_id);    });
passport.deserializeUser((user_id, done)=> {	done(null, user_id);	});



module.exports = router;


