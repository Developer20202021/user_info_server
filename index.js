const express = require('express');
const  mongoose = require('mongoose');
const cors = require('cors');
const UserInfoModal = require('./Modals/UserInfoModal');
const SectorsModel = require('./Modals/SectorsModel');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
require('dotenv').config()



const mongoosePassword = process.env.Mongoose_Password;
const mongooseUserName = process.env.Mongoose_UserName;
const PORT = process.env.PORT;








mongoose.connect(`mongodb://${mongooseUserName}:${mongoosePassword}@cluster0-shard-00-00.mgll3.mongodb.net:27017,cluster0-shard-00-01.mgll3.mongodb.net:27017,cluster0-shard-00-02.mgll3.mongodb.net:27017/userInfo?ssl=true&replicaSet=atlas-6onnuf-shard-0&authSource=admin&retryWrites=true&w=majority`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connection succesfull');
    
})
.catch(err =>{
    console.log(err);
})











app.get("/", (req, res)=>{

    res.send("Hello world from UserInfoServer");


 

});





// find single user information by id 
app.get("/single-user-info/:id", (req, res)=>{


    try {
        
  
        const requestedUserId = req.params.id;

        UserInfoModal.findOne({_id: requestedUserId}).then(user => {

            console.log(user);
            res.status(200).json(user);
       
        });

    } catch (error) {
        
    }


     });


 










// edit single user information 

app.put("/edit-user-info/:id", async(req, res)=>{


try {
    

    const removeData = [];
    const addedData = [];

    const id = req.params.id;
    // console.log(req.body);


    const userSelectionArray = req.body.userSelection;

    // console.log(userSelectionArray);


 

    const removeDuplicateData = (userArray)=>{


        // const myArray = ['a', 'b', 'c', 'c', 'b', 'd'];
      
      let uniqueElements = [...new Set(userArray)];
      
      const elementCounts = uniqueElements.map(value => [value, userArray.filter(str => str === value).length]);
      
   
      
      
      for (const value of elementCounts) {
        
      
      
        if (value[1]%2 == 0) {
      
          removeData.push(value);
          
        } else {
          addedData.push(value[0]);
      
        
        }
      
      
      
      }
      
      
      
      }
      
    removeDuplicateData(userSelectionArray) ;  


console.log(addedData);

    let EditedUserInfo = {
        UserName:req.body.userName,
        userSelection:addedData,
        userTermsChecked:req.body.userTermsChecked
    }


    const user = await UserInfoModal.findOneAndUpdate({_id:id},EditedUserInfo, { new: true } );
    res.json(user);
    console.log(user);


} catch (error) {
    
}



});




// get all user information 
app.get("/get-all-user-info", async(req, res)=>{

    try {
        
   
    const allUsers = await UserInfoModal.find()
    res.status(200).json({
      status: 'Success',
      data: allUsers,
    })

} catch (error) {
        
}
    // console.log(allUsers);


});







// delete user information 

app.delete("/single-user-info-delete/:id", async(req, res)=>{

try {
    

    await UserInfoModal.findOneAndRemove({
        _id: req.params.id   
    })
    res.json({message:"deleted"})

} catch (error) {
    
}


});





















// add user information 

app.post('/add-user-info',async (req, res)=>{
try {
    

    const {userName,userSelection,userTermsChecked} = req.body;

    
    // user Data validation 

    if (userTermsChecked === "" || userSelection == null) {

      
            res.json({message:"error"});
        

       
    } 





    const removeData = [];
    const addedData = [];

    
    // console.log(req.body);


    const userSelectionArray = req.body.userSelection;

    // console.log(userSelectionArray);


 

    const removeDuplicateData = (userArray)=>{


        // const myArray = ['a', 'b', 'c', 'c', 'b', 'd'];
      
      let uniqueElements = [...new Set(userArray)];
      
      const elementCounts = uniqueElements.map(value => [value, userArray.filter(str => str === value).length]);
      
   
      
      
      for (const value of elementCounts) {
        
      
      
        if (value[1]%2 == 0) {
      
          removeData.push(value);
          
        } else {
          addedData.push(value[0]);
      
        
        }
      
      
      
      }
      
      
      
      }
      
    removeDuplicateData(userSelectionArray) ; 


// console.log(userSelection);

    const UserInfo = {
        UserName:userName,
        userSelection:addedData,
        userTermsChecked:userTermsChecked
    }
   
        const Info = await new UserInfoModal(UserInfo);

        Info.save().then((data)=>{
            console.log(data);
            res.json({message:data});
        }).catch((err)=>{
            console.log(err);
        })


    } catch (error) {

        
    
    }
        
    
})

















// sectors data 



var sectors = [

    {sectorName:"Manufacturing", 


    options:[


        {subsector:"Construction materials",
        suboptions:
            {subsector2:[""], subsector3:[""]}

                    
        
        },


        

        {subsector:"Electronics and Optics",
        suboptions:
           {subsector2:[""], subsector3:[""]}

                    
        
        },


        
        {subsector:"Food and Beverage",
        suboptions:
           {subsector2:["Bakery & confectionery products","Beverages", "Fish & fish products", "Meat & meat products", "Milk & dairy products", "Other","Sweets & snack food"], subsector3:[""]}

                    
        
        },




        {subsector:"Furniture",
        suboptions:
            {subsector2:["Bathroom/sauna","Beverages", "Bedroom", "Childrenâ€™s room ", "Kitchen", "Living room","Office", "Other (Furniture)", "Outdoor",  "Project furniture" ], subsector3:[""]}

                    
        
        },



        
        {subsector:"Machinery",
        suboptions:
           {subsector2:["Machinery components","Machinery equipment/tools", "Manufacture of machinery ", "Metal structures","Other","Repair and maintenance service", "Maritime"], subsector3:["Aluminium and steel workboats", "Boat/Yacht building",  "Ship repair and conversion", "Ship repair and conversion",]}, 

                    
        
        },






        {subsector:"Metalworking",
        suboptions:
            {subsector2:["Construction of metal structures","Houses and buildings", "Metal products", "Metal works", ], subsector3:["CNC-machining", "Forgings, Fasteners ",  "Gas, Plasma, Laser cutting", "MIG, TIG, Aluminum welding",] }

                    
        
        },





        {subsector:"Plastic and Rubber",
        suboptions:
            {subsector2:["Packaging","Plastic goods","Plastic profiles", "Plastic processing technology", ], subsector3:["Blowing", "Moulding",  "Plastics welding and processing",] }

                    
        
        },



        {subsector:"Printing ",
        suboptions:
            {subsector2:["Advertising","Plastic goods","Book/Periodicals printing", "Labelling and packaging printing", ], subsector3:[""] }

                    
        
        },




        
        {subsector:"Textile and Clothing",
        suboptions:
            {subsector2:["Clothing","Textile", ], subsector3:[""] }

                    
        
        },



        {subsector:"Wood",
        suboptions:
           {subsector2:["Other (Wood)","Wooden building materials", "Wooden houses",], subsector3:[""] }

                    
        
        },







            ]
    },



    {sectorName:"Other", 
    options:[

        {subsector:"Creative industries",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },

        {subsector:"Energy technology",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },




        {subsector:"Environment",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },







            ]
    },







    
    {sectorName:"Service", 
    options:[

        {subsector:"Business services",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },

        {subsector:"Engineering",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },




        {subsector:"Information Technology and Telecommunications",
        suboptions:
            {subsector2:["Data processing, Web portals, E-marketing", "Programming, Consultancy", "Software, Hardware", "Software, Hardware", "Software, Hardware", "Telecommunications", ], subsector3:[""] }

                    
        
        },



        {subsector:"Tourism",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },


       


        {subsector:"Translation services",
        suboptions:
            {subsector2:[""], subsector3:[""] }

                    
        
        },


        


        {subsector:"Transport and Logistics",
        suboptions:
            {subsector2:["Air","Rail", "Road", "Water",], subsector3:[""] }

                    
        
        },



            ]
    },




]







// for (var element of sectors) {
    

//     for (const value of element.options) {

//         console.log(value.suboptions);
        
//     }

    

    
// }






// save all sectors to database

// app.get("/save-all-sectors", async(req, res)=>{

//     const SectorInfo = {
//         Sectors:sectors
//     }
   
//         const Info = await new SectorsModel(SectorInfo);

//         Info.save().then(()=>{
//             res.json({message:"d"});
//         }).catch((err)=>{
//             console.log(err);
//         })


// });






app.get("/get-all-sectors", async(req, res)=>{

try {
    

    const allSectors = await SectorsModel.find()
    res.status(200).json({
      status: 'Success',
      data: allSectors,
    })

} catch (error) {
    
}

})












 




app.listen(PORT || 4000, ()=>{
    console.log(`successfull`);
})