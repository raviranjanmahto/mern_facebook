const express = require("express");
const {
  ok,
  register,
  activateAccount,
  login,
  resendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
} = require("../controllers/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.get("/ok", ok);
router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/resendVerification", authUser, resendVerification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);

module.exports = router;
