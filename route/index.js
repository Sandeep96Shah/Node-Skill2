const express=require('express');

const router=express.Router();

const homecontroller=require('../controller/home');

// rendering home view 
router.get('/',homecontroller.home);

// route for file
router.use('/file',require('./file'));

module.exports=router;