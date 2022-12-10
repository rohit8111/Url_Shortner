const express=require('express');
const url_shortner=require('../services/service')
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Hello URL');
});

router.post('/',url_shortner.shortUrl);

module.exports = router;