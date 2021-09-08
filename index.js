const express=require('express');
const port=7000;
// creating express app
const app=express();

app.use(express.urlencoded());

app.use('/',require('./route'));

app.listen(port,(err) => {
     if(err){
         console.log(`Server is Down`);
         return;
        }

        console.log(`Server is running on Port : ${port}`);
});