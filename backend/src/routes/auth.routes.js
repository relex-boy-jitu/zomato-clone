const express = require('express');
const authcontroller = require('../controllers/auth.controller');
const foodPartnerModel = require('../models/foodpartner.model');

const router = express.Router();

//use auth apis
router.post('/user/register',authcontroller.registerUser)
router.post('/user/login',authcontroller.loginUser)
router.get('/user/logout',authcontroller.logoutUser)


//food partners auth apis
router.post('/food-partner/register',authcontroller.registerFoodPartner)
router.post('/food-partner/login',authcontroller.loginFoodPartner)
router.get('/food-partner/logout',authcontroller.logoutFoodPartner)
module.exports = router;