const express=require('express');
const router=require('./routes/routing');
const app=express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));
//Databse Connection
async function main() {
  await mongoose.connect('mongodb+srv://rohit:rohit@cluster0.21fwy8u.mongodb.net/shortUrl');
}
app.use(express.urlencoded({ extended: false }));
app.use('/',router);

app.listen(3000,()=>{
    console.log('Server Started on Port 3000');
})
