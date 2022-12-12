const shorturl = require("../model/urlshortschema");
const jwt = require("jsonwebtoken");
const { isEmail, isURL } = require("validator");
const url_shortner = {};

//handle Error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { full: "" };

  //incorrect email while login
  if (err.message === "URl is invalid") {
    errors.full = "URL is invalid";
    return errors;
  }

  // duplicate url error
  if (err.code === 11000) {
    console.log("Already have short url");
  }

  // validation errors
  if (err.message.includes("ShortUrl validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(err.errors);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
//get user id from JWT token
function getToken(token)  {
 var userId="";
  if (token) {
    jwt.verify(token, process.env.JWT_SECREAT, async (err, decodeedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
    userId=decodeedToken.id;
     
       
      }
    });
  } else {
    res.redirect("/login");
  }
  return userId;
};


url_shortner.shortUrl = async (req, res, next) => {
  try {
    const data = req.body.url;
    const token = req.cookies.jwt;

    //Get user ID from JWT TOKEN
 
    var userId=getToken(token);
  

    //check if URL is valid or not
    if (!isURL(data, { require_protocol: true })) {
      let err = new Error("URl is invalid");
      throw err;
    }
    let ogUrlChecker = await shorturl.findOne({ userId: userId, full: data });
    if (ogUrlChecker) {
      const newUrl = ogUrlChecker;
      console.log(newUrl);
      res.status(201).json({ newUrl });
    } else {
      const newUrl = shorturl({
        userId: userId,
        full: data,
        short: "",
        clicks: 0,
      });
      //_id from mongodb
      const shortUrlFromId = newUrl._id.toString().slice(-6);
      newUrl.short = shortUrlFromId;
      console.log(newUrl);
      newUrl.save(function (err) {
        if (err) throw err;
        console.log("the new URL is added");
      });
      res.status(201).json({ newUrl });
    }
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

url_shortner.getAllUrls=async(req,res)=>{
  try {
    const token = req.cookies.jwt;
    var userId=getToken(token);
    let data=await shorturl.find({userId});
    res.render('allurls',{data});
  } catch (error) {
    
  }
}


module.exports = url_shortner;
