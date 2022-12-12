const express=require('express');
const router=require('./routes/routing');
const cookieParser=require('cookie-parser');
const {requireAuth,checkUser}=require('./middleware/authMiddlewear');
const shortUrlRouting=require('./routes/shorturlrouting');
const routeToOriginal=require('./routes/routing_to_og');
const app=express();
const mongoose = require('mongoose');


require('dotenv').config()

app.use(express.static('public'));
app.set('view engine','ejs');
const dbURI = process.env.connection_string;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get('*', checkUser);
app.use('/',router);
app.get('/:userId',routeToOriginal);
app.use('/short',requireAuth,shortUrlRouting);


