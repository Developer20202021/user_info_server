const mongoose = require('mongoose');

const SectorsScheema = new mongoose.Schema({

  
    Sectors:{
        type:Array,
       default:["none"]
    },


   
    
})


module.exports = SectorsScheema;