const jwt = require("jsonwebtoken");

const authenticate =async (req, res, next) => {
  const token =await req?.headers?.authorization?.split(" ")[1];
   
  
  if (!token){
     await res.json({code:401, message: "Access denied. No token provided." });
  }

  try {
    const decoded =await jwt.verify(token, "JWT_SECRET", (err) => {
      if (err) {
        
        
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ code: 401, message: "Token has expired, please login again." });
        }
        return res.status(401).json({ code: 401, message: "Invalid token." });
      }else{
        next();
      }
    });
  
  } catch (error) {
    res.json({code:401, message: "Invalid token." });
  }
};

module.exports = authenticate;
