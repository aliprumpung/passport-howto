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

router.get('/users', midWAuth ,(req,res,next)=>{
	res.render('users');
});

router.get('/login',(req,res,next)=>{

	if (req.isAuthenticated===true){
	res.redirect('/');
		
	}else{
		res.render('login');
	}
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



passport.serializeUser((id, done)=> { 	done(null,id);    });
passport.deserializeUser((id, done)=> {	done(null,id);	});



module.exports = router;


