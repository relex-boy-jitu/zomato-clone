const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Mongo DBconnected");
    })
    .catch((err) =>{
        console.log("mongoDB connection error",err);
    })
}
module.exports = connectDB;