const express=require('express');
const shortUrlController=require('../controller/shortUrlController')
const authController=require('../controller/authController')
const requireAuth=require('../middleware/authMiddlewear');
const User=require('../model/users');
const shorturl=require('../model/urlshortschema');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.get('/:urlId',async(req,res)=>{
    var urlId=req.params.urlId;
    try {
        let status=await shorturl.findOne({short:urlId});
        if(status){
        var fullUrl=status.full;
        console.log(fullUrl);
        res.redirect(fullUrl);}
        else{
            res.statusCode=404;
            res.render('errorPage');
        }   
     } catch (error) {
        res.statusCode=404;
        res.render('errorPage');
    }

})
module.exports=router;