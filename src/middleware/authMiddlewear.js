const jwt = require('jsonwebtoken');
const User=require('../model/users');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECREAT, (err, decodedToken) => {
      if (err) {
      
        res.redirect('/login');
      } else {
        
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};
const checkUser=(req,res,next)=>{
  const token=req.cookies.jwt;
  if(token){
    jwt.verify(token,process.env.JWT_SECREAT,async(err,decodeedToken)=>{
      if(err){
        res.locals.user = null;
        next();
      }
      else{
        let user=await User.findById(decodeedToken.id);
        res.locals.user = user;
        next();

      }
    })
  }else{
    res.locals.user = null;
    next();

  }
}

module.exports = { requireAuth, checkUser };