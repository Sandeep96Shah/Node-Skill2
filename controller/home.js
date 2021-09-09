const CSVFILE = require('../model/csvfile');

module.exports.home=async (req,res) => {  
    try{

        // fetching the entire files from the database
        let  csvfiles=await CSVFILE.find({});

        // rendering home view
        return res.render('home',{
            title:'home',
            data:csvfiles
        });

    }catch(err){
        console.log('error in fetching files from database!',err);
        return res.redirect('back');
    }
}