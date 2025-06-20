const express = require("express");
const router = express.Router();
const { loginHandler } = require("../controllers/auth-controller");

router.post("/", loginHandler);

module.exports = router;
