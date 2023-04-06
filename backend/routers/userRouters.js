const { userControllers } = require("../controllers");
const router = require("express").Router();


router.get("/", userControllers.getAllUsers);


module.exports = router;