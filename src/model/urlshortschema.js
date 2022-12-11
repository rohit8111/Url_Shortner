const mongoose = require('mongoose');
const { isEmail } = require('validator');

const shortUrlSchema = new mongoose.Schema({
  user:{
    type:String,
    required:true
  },
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: 'abcdef'
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
