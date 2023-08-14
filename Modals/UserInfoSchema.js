const mongoose = require('mongoose');

const UserInfoScheema = new mongoose.Schema({

  
    UserName:{
        type:String,
        required:true
    },

    userSelection:{
        type:Array,
       default:["none"],
       required:true
    },


    userTermsChecked:{
        type:String,
        required:true
    },
    
})


module.exports = UserInfoScheema;