const router = require("express").Router();
const mailerController = require("../controllers/mailerController");

router.post("/send", mailerController.sendMail);

module.exports = router;
