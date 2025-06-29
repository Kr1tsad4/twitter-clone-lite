const authService = require("../services/auth-service");
const asyncHandler = require("express-async-handler");

const loginHandler = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body);
  res.status(200).json({
    message: "Login successfully",
    user: user,
  });
});

module.exports = { loginHandler };
