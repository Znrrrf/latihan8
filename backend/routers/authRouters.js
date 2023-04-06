const { authCOntrollers } = require("../controllers");
const router = require("express").Router();



router.post("/register", authCOntrollers.register);
router.post("/login", authCOntrollers.login);


module.exports = router;