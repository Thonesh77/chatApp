import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';


// SIGNUP
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate token
    generateToken(newUser._id, res);

    // Response
    res.status(201).json({
      message: "User created successfully",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePicture: newUser.profilePicture
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};


// LOGIN
export const login = async (req, res) => {
 try {  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }   
  // Check if user exists
  const user = await User.findOne({
    email
  });   

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }


  // Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }


  // Generate token
  generateToken(user._id, res);

  // Response 
  res.status(200).json({       
    message: "Login successful",
    _id: user._id,
    fullName: user.fullName,    
    email: user.email,
    profilePicture: user.profilePicture
  }); 

  } catch (error) { 
    console.error("Error during login:", error);  
    res.status(500).json({ message: "Server error during login" });
  }   
};


// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ message: "Logout successful" });
  }
  catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server error during logout" });
  } 


};
// update profile

export const updateProfile = async (req, res) => { 
  try {
    const {profilePicture} = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true } 
    );  
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json({
      message: "Profile updated successfully",
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture
    });
  }
  catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error during profile update" });
  } 

}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Authenticated",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture
    });
  }
  catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({ message: "Server error during authentication check" });
  }
};

 
