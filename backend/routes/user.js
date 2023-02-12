const express = require("express");
const {
  register,
  activateAccount,
  login,
  resendVerification,
  findUser,
  sendResetPasswordCode,
} = require("../controllers/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/resendVerification", authUser, resendVerification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);

module.exports = router;
