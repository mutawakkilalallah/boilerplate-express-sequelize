const { Router } = require("express");
const { login } = require("../controller/auth-controller");

const auth = Router();

auth.post("/login", login);

module.exports = auth;
