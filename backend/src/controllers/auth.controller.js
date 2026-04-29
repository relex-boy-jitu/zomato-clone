const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){
    try {
        const {fullName , email , password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            email
        })
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({
            message:"user register sucessfully",
            user:{
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function loginUser(req, res){
    const {email , password} = req.body;

    const user = await userModel.findOne({
        email
    })
    if(!user){
       return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
       return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET )

    res.cookie("token", token)

    res.status(200).json({
        message:"user logged in sucessfuly",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })

}

function logoutUser(req, res){
     res.clearCookie("token");
     res.status(200).json({
        message:"user logout sucessfully"
     });
 }

async function registerFoodPartner(req, res){
    console.log("BODY 👉", req.body);   // 👈 add this
   const {businessName , email , password, phone ,address,contactName} = req.body;

   if (!businessName || !email || !password || !phone || !address || !contactName) {
   return res.status(400).json({
      message: "All fields are required"
   })
}
   const isAccountAlreadyExist = await foodPartnerModel.findOne({
     email
   })

   if(isAccountAlreadyExist){
       return res.status(400).json({
         message: " food Partner accout already exists"
       })
   }
 
   const hashedPassword = await bcrypt.hash(password, 10);

   const foodPartner = await foodPartnerModel.create({
      name: businessName,
      email,
      password: hashedPassword,
      phone,
      address,
      contactName
   })

   const token = jwt.sign({
       id: foodPartner._id,
   },process.env.JWT_SECRET)

   res.cookie("token",token)

   res.status(201).json({
       message:"food partner register sucessfuly",
       foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
       }
   })

}

async function loginFoodPartner(req,res){
     const {email , password} = req.body;

   const foodPartner = await foodPartnerModel.findOne({
     email
   })

   if(!foodPartner){
       return res.status(400).json({
         message: "Invalid email or password"
       })
   }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid){
       return res.status(400).json({
         message:"Invalid email or password"
       })
    }
    const token = jwt.sign({
       id: foodPartner._id,
   },process.env.JWT_SECRET)

   res.cookie("token",token)

   res.status(200).json({
       message:"food partner logged in sucessfuly",
       foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
       }
   })

}

function logoutFoodPartner(req, res){
     res.clearCookie("token");
     res.status(200).json({
        message:"foodPartner logout sucessfully"
     });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}