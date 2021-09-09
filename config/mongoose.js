const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/csvfile_upload', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error hile connecting to the database!','error'));

db.once('open',function()
{
    console.log("Connected successfully to the Database!");
});

module.exports=db;