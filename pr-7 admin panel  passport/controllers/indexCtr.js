const AddAdmin = require('../models/adminmodel');
const mailMessage = require("../config/middleware/mailMessege");
const bcrypt = require("bcrypt");

module.exports.loginpage = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.render("auth/login")
    }
    else {
      return res.redirect("/admin/deshboard")
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect("/")
  }
}
module.exports.loginuser = async (req, res) => {
  try {
    return res.redirect("/admin/deshboard")
  }
  catch (err) {
    console.log(err);
    return res.redirect("/")
  }
}
module.exports.logoutuser = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) console.log(err);
      else return res.redirect("/");
    })
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
module.exports.forgetpassword = async (req, res) => {
  try {
    return res.render("auth/forgetpassword")
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
module.exports.sendMailWithOTP = async (req, res) => {
  try {
    let admin = await AddAdmin.findOne({ email: req.body.email });

    if (!admin) {
      console.log("Admin not found with this email");
      return res.redirect("/");
    }
    let otp = Math.floor(1000 + Math.random() * 9000);

    let msg = {
      from: "shaileshnandola123@gmail.com",
      to: `${req.body.email}`,
      subject: "Password Reset OTP",
      html: `
             <p>Hello..Cofeee Helloo...HealthyFood </p>
             <p>Your OTP for password reset is: <strong>${otp}</strong></p>
             <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    await mailMessage.sendEmail(msg);

    res.cookie('otp', otp),
      res.cookie('email', req.body.email)
    return res.render("auth/verifyotp")
  }
  catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};
module.exports.verifyotp = async (req, res) => {
  try {
    let otp = req.cookies.otp;
    if (otp == req.body.otp) {
      res.clearCookie('otp')
      return res.render("auth/resetpassword")
    }
    else {
      return res.render("auth/verifyotp");
    }
  } catch (error) {
    console.log("All Error")
  }
}

module.exports.verifyotppage = async (req, res) => {
  try {
    return res.render("auth/verifyotppage");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

module.exports.resetpasswordpage = async (req, res) => {
  try {
    return res.render("auth/resetpassword")
  } catch (error) {
    console.log(error)
  }
}


module.exports.resetpassword = async (req, res) => {
  try {
    let newpassword = req.body.newpassword
    let conformpassword = req.body.conformpassword

    if (newpassword !== conformpassword) {
      return res.render("auth/resetpassword")
    }

    let email = req.cookies.email;
    if (!email) {
      console.log("Email Not Found")
      return res.redirect("auth/verifyotp")
    }

    let hashpass = await bcrypt.hash(newpassword, 10)

    await AddAdmin.findOneAndUpdate({ email: email }, { password: hashpass })

    res.clearCookie('otp')
    res.clearCookie('email')

    console.log("Password Reset Done")
    return res.redirect("/")

  } catch (error) {
    console.log("Reset Password Error:", error);
    return res.redirect("/resetpassword");
  }
};
module.exports.changePasswordpage = async (req, res) => {
  try {
    let admin = req.cookies.admin;
    return res.render("auth/changePasswordpage", { admin })
  } catch (error) {
    console.log(error)
  }
}
module.exports.changePassword = async (req, res) => {
  try {
    let admin = req.cookies.admin;
    const { oldPassword, NewPassword, cpassword } = req.body
    let matchpass = await bcrypt.compare(oldPassword, admin.password);
    if (matchpass) {
      if (NewPassword == cpassword) {
        let hasepassword = await bcrypt.hash(NewPassword, 10)
        await AddAdmin.findByIdAndUpdate(admin._id, { password: hasepassword })
        console.log("password change success");
        return res.redirect("/admin/deshboard")
      }
      else {
        console.log("new and  confirm password mismatch");
        return res.redirect("/")
      }
    }
    else {
      console.log("old password mismatch");
      return res.redirect("/change-password")
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect("/")
  }
}
module.exports.viewprofilepage = async (req, res) => {
  try {
    let admin = req.cookies.admin;
    return res.render("auth/viewprofilepage", { admin })
  } catch (error) {
    console.log(error)
    return res.redirect("/")
  }
}





