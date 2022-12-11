const express=require('express');
const router=require('./routes/routing');
const cookieParser=require('cookie-parser');
const {requireAuth,checkUser}=require('./middleware/authMiddlewear');
const shortUrlRouting=require('./routes/shorturlrouting');
const app=express();
const mongoose = require('mongoose');



app.use(express.static('public'));
app.set('view engine','ejs');
const dbURI = 'mongodb+srv://rohit:rohit@cluster0.21fwy8u.mongodb.net/shortUrl?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// main().catch(err => console.log(err));
// //Databse Connection
// async function main() {
//   await mongoose.connect('');
// }

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get('*', checkUser);
app.use('/',router);

app.use('/shorturl',requireAuth,shortUrlRouting);

// app.listen(3000,()=>{
//     console.log('Server Started on Port 3000');
// })
