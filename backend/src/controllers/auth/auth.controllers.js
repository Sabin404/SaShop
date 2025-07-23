const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');


//register
const registerUser = async (req, res) => {
  const { username,email, password } = req.body;
  try{
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser= new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save();
    return res.status(201).json({success:true, message: 'User registered successfully' });

  }catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


//login
const loginUser=async(req,res)=>{
  const {email, password } = req.body;
  try{

  }catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}



//logout



module.exports = {
  registerUser,
  loginUser,
  // logoutUser
}