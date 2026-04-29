const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4: uuid} = require("uuid");

async function createFood(req, res){
try{
   console.log(req.foodPartner)
   console.log(req.body);
   console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
  req.file.buffer,
  req.file.originalname,
);
   
   const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      businessName: req.foodPartner.name, // 👈 add this
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id
   })

   res.status(201).json({
       message:"food created sucessfully",
       food: foodItem
   })
}
    catch (error) {
      console.error(error);
      res.status(500).json({
         message: "Error creating food",
         error: error.message
      });
   }
}
  

async function getFoodItems(req, res){
   const foodItems = await foodModel.find({})
   res.status(200).json({
      message:"Food Item fatched sucessfuly",
      foodItems
   })
}

module.exports = {
   createFood,
   getFoodItems
};
