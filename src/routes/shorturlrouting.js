const express=require('express');
const shortUrlController=require('../controller/shortUrlController')
const authController=require('../controller/authController')
const requireAuth=require('../middleware/authMiddlewear');
const router=express.Router();

router.get('/shorturl',(req,res)=>{
    res.render('shorturl');
})
router.post('/shorturl',shortUrlController.shortUrl);
module.exports=router;