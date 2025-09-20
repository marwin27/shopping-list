// const jwt = require("jsonwebtoken");
// const JWT_secret = "secret";

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_secret);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// const authenticatedRedirect = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token) {
//     try {
//       jwt.verify(token, JWT_secret);
//       return res.redirect("/home");
//     } catch (err) {
//       next();
//     }
//   } else {
//     next();
//   }
// };

// module.exports = { authenticateToken, authenticatedRedirect };
