const verifyRole = (...role) => {
    return (req, res, next) => {
        
        if (role.includes(req.user.role)) {
              next();
        }else{
            return res.json({ Message: "Role is not Defined" })
        }
      
    }
}
module.exports = verifyRole