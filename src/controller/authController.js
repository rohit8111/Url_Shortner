const User=require('../model/users');
const jwt=require('jsonwebtoken');

//To handle a error like "Email id is not valid or duplicate Email Id"
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { emailId: '', password: '' };

    //incorrect email while login
    if (err.message === 'incorrect email') {
        errors.emailId = 'EmailId is not registered';
      }
    
      // incorrect password while login
      if (err.message === 'incorrect password') {
        errors.password = 'Password is incorrect';
      }
    // duplicate email error
    if (err.code === 11000) {
      errors.emailId = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        console.log(err.errors);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  //Generating JWT token valid upto 3 days
  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECREAT, {
      expiresIn: maxAge
    });
  };

  //serve login page
module.exports.login_get=(req,res)=>{
    res.render('login');
}
//serve signup page
module.exports.signup_get=(req,res)=>{
    res.render('signup');
}


//post request for signup
module.exports.signup_post=async(req,res)=>{
    const {name, emailId, password } = req.body;
    console.log(emailId);
    try {
      const user = await User.create({ name,emailId, password });
      const token=createToken(user._id);
      //Inserting a JWT token into cookie
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(201).json({user:user._id});
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}
module.exports.login_post=async(req,res)=>{
    const { emailId, password } = req.body;
    

  try {
    const user = await User.login(emailId, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }

