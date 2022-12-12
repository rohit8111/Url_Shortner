const mongoose = require('mongoose');
const { isEmail } = require('validator');
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
    validate: {
      validator: function(v) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(v);
      },
      message: props => ` Enter valid URL!`
    }
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
