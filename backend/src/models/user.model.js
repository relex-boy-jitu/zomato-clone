const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
      fullName:{
        type: String,
        required: true
      },
      email:{
        type: String,
        required: true,
        unique: true,
      },
      password:{
        type: String,
        required: true
      }
},
    {
      timestamps: true
    }
)
const userModel = mongoose.model("user", userschema);
module.exports = userModel;