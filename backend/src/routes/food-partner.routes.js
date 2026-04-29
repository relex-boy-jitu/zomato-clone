const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
   
/* GET /api/food/food/partner [protected]  */
router.get("/:id", 
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

module.exports = router;