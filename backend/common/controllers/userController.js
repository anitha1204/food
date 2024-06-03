// const userDB = require("../model/userModel");
// const jwt = require ("jsonwebtoken");

// const maxAge = 3*24*60*60;

// const createToken = (id) => {
//    return jwt.sign({ id }, "anithe super secret key", {
//      expiresIn: maxAge, 
//    });
//  };


// const userPost = async (req,res)=>{
//    try {
//       const {Username,Useremail,Address} = req.body;
//       const CreateData = new userDB ({Username,Useremail,Address})

//       await CreateData.save();

//       res.json({
//         data:CreateData,
//       });

//    } catch (error) {
//     res.json({
//         Error:error.message,
//     });
    
//    } 
// };

// const register = async (req,res)=>{
//   try {
//    const {email, password } = req.body;
//    const user = await userDB.create({email, password});
//    const token = createToken(user._id);

//    res.cookie("jwt", token,{
//      withCrdentials: true,
//      httpOnly: false,
//      maxAge: maxAge * 1000,
//    });
//    res.status(201).json({ user: user._id, created: true});
   
//   } catch (error) {
//    console.log(err);
//   }
// };

// const login = async (req,res)=>{
//   try {
    
//    } catch (error) {
    
//   }
// }
// module.exports = 
// { userPost,
//   register,
//   login,
// };

const userDB = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const maxAge = 3*24*60*60;
// Function to create a token
const createToken = (id) => {
  return jwt.sign({ id }, "anithe super secret key", {
    expiresIn: maxAge, // Set a valid expiration time
  });
};

// User registration function
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = await userDB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userDB({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    // Create a token
    const token = createToken(newUser._id);

    res.status(201).json({
      data: newUser,
      token,
    });
  } catch (error) {
    console.log(error); // Fixed: changed err to error
    res.status(500).json({
      error: error.message,
    });
  }
};

const userPost = async (req, res) => {
  try {
    const { Username, Useremail, Address } = req.body;
    const CreateData = new userDB({ Username, Useremail, Address });

    await CreateData.save();

    res.json({
      data: CreateData,
    });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

// User login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userDB.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create a token
    const token = createToken(user._id);

    res.json({
      data: user,
      token,
    });
  } catch (error) {
    console.log(error); // Fixed: changed err to error
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  userPost,
  register,
  login,
};
