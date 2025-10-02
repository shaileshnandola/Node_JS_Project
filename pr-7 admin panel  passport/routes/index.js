const express = require('express');
const routes = express.Router();
const { loginpage, loginuser, logoutuser, forgetpassword, sendMailWithOTP, resetpassword, resetpasswordpage, verifyotppage, verifyotp, changePasswordpage, changePassword, viewprofilepage } = require("../controllers/indexCtr");
const passport = require('passport');
routes.use("/admin", passport.checkAdmin, require("./admin.routes"));
routes.use("/category", passport.checkAdmin, require("./category.routes"));
routes.use("/subcategory", passport.checkAdmin, require("./subcategory.routes"));
routes.use("/extracategory", passport.checkAdmin, require("./extracategory.routes"));
routes.use("/product", passport.checkAdmin, require("./product.routes"));

routes.get("/", loginpage);
routes.post("/login", passport.authenticate('local', { failureRedirect: '/' }), loginuser)
routes.get("/logout", logoutuser);
routes.get("/forgotpass", forgetpassword)
routes.post('/sendMailWithOTP', sendMailWithOTP)
routes.get("/verifyotppage", verifyotppage)
routes.post("/verifyotp", verifyotp)
routes.post("/resetpassword", resetpassword)
routes.get("/resetpasswordpage", resetpasswordpage)
routes.get("/change-password", changePasswordpage)
routes.post("/change-password", changePassword)
routes.get("/view-profile", viewprofilepage)



module.exports = routes;
