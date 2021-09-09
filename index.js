const express=require('express');
const port=7000;
const db=require('./config/mongoose');
//const cokkiesparser=require('cookie-parser');
// creating express app
const app=express();

app.use(express.urlencoded({ extended: true }))
//app.use(cokkiesparser());

app.use('/uploads',express.static(__dirname +'/uploads'));

app.use(express.static(__dirname + '/CSS'));

app.set('view engine','ejs');
app.set('views','./view');

app.use('/',require('./route'));

app.listen(port,(err) => {
     if(err){
         console.log(`Server is Down`);
         return;
        }

        console.log(`Server is running on Port : ${port}`);
});