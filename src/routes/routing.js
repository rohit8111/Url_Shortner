const express=require('express');
const shortUrlController=require('../controller/shortUrlController')
const authController=require('../controller/authController')
const router=express.Router();


router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/login',authController.login_get);

router.get('/signup',authController.signup_get);
//post request for sigining in user
router.post('/login', authController.login_post);
//post request for Registering User
router.post('/signup',authController.signup_post);



router.get('/logout',authController.logout_get);

module.exports = router;