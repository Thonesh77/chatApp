import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId }, // ✅ match middleware
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, { // ✅ match middleware
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token;
};