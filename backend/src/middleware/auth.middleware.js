import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(400)
        .json({ message: "Unauthorized - No Token Provided" });
    else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded)
        return res
          .status(400)
          .json({ message: "Unauthorized - No Token Provided" });
      else {
        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
          return res
            .status(400)
            .json({ message: "Unauthorized - No Token Provided" });
        } else {
          req.user = user;
          next();
        }
      }
    }
  } catch (e) {
    console.log(`Error in singup controller ${e.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};
