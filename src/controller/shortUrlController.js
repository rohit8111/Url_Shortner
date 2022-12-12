const shorturl=require('../model/urlshortschema');
const jwt = require('jsonwebtoken');
const { isEmail,isURL } = require('validator');
const url_shortner={};


//handle Error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { full:''};

    //incorrect email while login
    if (err.message === 'URl is invalid') {
        errors.full= 'URL is invalid';
        return errors;
      }
    
      
     
    // duplicate url error
    if (err.code === 11000) {
      console.log("Already have short url");
    }
  
    // validation errors
    if (err.message.includes('ShortUrl validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(err.errors);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
//Get user Id from token and create schema by generating shortUrl.
url_shortner.shortUrl=async(req,res,next)=>{
    try {
        const data=req.body.url;
        const token=req.cookies.jwt;
    //Get user ID from JWT TOKEN
        var userId;
        if(token){
            jwt.verify(token,'Project Mil Jaye Jaldi',async(err,decodeedToken)=>{
            if(err){
                res.redirect('/login');
        }
        else{
            userId = decodeedToken.id;
        }
    })
  }else{
    res.redirect('/login');

  }
  if(!isURL(data)){
    let err=new Error("URl is invalid");
    throw err;

  }
      

   const newUrl=shorturl({
    userId:userId,
    full:data,
    short:"",
    clicks:0
   })
   //_id from mongodb 
   const shortUrlFromId = newUrl._id.toString().slice(-6);
    newUrl.short = shortUrlFromId;
    console.log(newUrl);
    newUrl.save(function(err){
        if(err) throw err;
        console.log("the new URL is added");
    })
    res.status(201).json({newUrl});

  

       
        


        
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
       
    }
};

module.exports=url_shortner;