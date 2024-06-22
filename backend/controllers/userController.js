const userDB = require("../model/userModel");
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 *60 * 60;

const createToken = (id) =>{
  return jwt.sign({id},"kanitha super secret key",{
    expiresIn:maxAge,
  });

};

const handleErrors = (err) =>{
  let errors ={Username:"", Useremail:"", password:"" };
  if(err.message ==="incorrect email")
     errors.Useremail = "That email is not registered";
  if(err.code===11000){
    errors.Useremail = "Email is already registerd";
    return errors;
  }
  if(err.message.includes("sers validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] =properties.message;
    })
  }
  return errors;
};

const register = async(req,res,next) =>{

  try {
    const {Username,Useremail,Password,Useraddress} = req.body;
    const user = await userDB.create({Username,Useremail,Password,Useraddress})
    const token = createToken(user._id);

    res.cookie("jwt", token,{
     withCrdentials: true,
     httpOnly: false,
     maxAge: maxAge * 1000,
    });

    res.status(201).json({data:user,token});

   } catch (error) {
     console.log(error);
     const errors = handleErrors(error);
     res.json({errors, created:false});
}
};



const login = async(req,res,next) =>{
  try {
    const {Useremail,Password} = req.body;
    const user = await userDB.create({Useremail,Password})
    const token = createToken(user._id);

    res.cookie("jwt", token,{
     withCrdentials: true,
     httpOnly: false,
     maxAge: maxAge * 1000,
    });

    res.status(200).json({data:user});

   } catch (error) {
     console.log(error);
     const errors = handleErrors(error);
     res.json({errors, created:false});
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


module.exports = {
  userPost,
  register,
  login
};
