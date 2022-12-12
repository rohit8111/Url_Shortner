const mongoose = require('mongoose');
const { isEmail,isURL } = require('validator');
// const { default: isURL } = require('validator/lib/isURL');
// validate original url
//  function validateUrl(value) {
  
// }

const shortUrlSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  full: {
    type: String,
    required: [true,"Please Enter URL to short"],
    validate:  [isURL, 'Please enter a valid URL']
  },
  short: {
    type: String,
    required:true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

 const shorturl= mongoose.model('ShortUrl', shortUrlSchema)
 module.exports=shorturl;
