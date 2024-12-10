const { Router } = require("express");
const authRouter = require("./auth");
const contactRouter = require("./contact");

const auth = require("../../middleware/authentication");

const router = Router();

router.use("/", authRouter);
router.use("/contact", auth, contactRouter);

module.exports = router;
