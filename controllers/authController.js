import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; 
import crypto from 'crypto';
import User from '../models/User.js';
import { sendSuccessMessage, senderrorMessage } from '../utils/responseHelper.js';
import { sendOtp } from '../utils/sendotp.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../uploads');
// const validatePassword = (password) => {
//     const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    // if (!passwordPattern.test(password)) {
    //   return "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, digit, and special character.";
    // }
  //   return true;
  // };

  // const phoneRegex = /^[0-9]{10}$/;

export const signup = async (req, res) => {
  const { name, email, phone, password, confirmPassword, deviceToken,image} = req.body;

  // const passwordValidation = validatePassword(password);
  // if (passwordValidation !== true) {
  //   return res.status(400).json({ message: passwordValidation });
  // }

  try {
    
    const existingUser = await User.findOne({where:{ email} });
    
    if (existingUser) {
      return senderrorMessage(res,req, 400, "emailAlreadyInUse");
    }
    const existingUsers = await User.findOne({where:{ phone}});
    if (existingUsers) {
      return senderrorMessage(res,req, 400, "phoneNumberAlreadyInUse");
    }

    if (password !== confirmPassword) {
      return senderrorMessage(res,req, 400, "passwordsDoNotMatch");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const deviceID = uuidv4(); 

    const otp = crypto.randomInt(1000, 9999).toString(); 
    const otpExpiry = Date.now() + 10 * 60 * 1000;  

    // const newUser = new User({
    //   name,
    //   email,
    //   phone,
    //   password: hashedPassword,
    //   confirmPassword: hashedPassword,
    //   image,
    //   otp,
    //   otpExpiry,
    //   isEmailVerified: false,
    //   deviceID,
    //   deviceToken
    // });
    // await newUser.save();
    const newUser = {
      name,
      email,
      phone,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      image,
      otp,
      otpExpiry,
      isEmailVerified: false,
      deviceID,
      deviceToken, 
    };
    const saveData = await User.create(newUser)
    const token = jwt.sign({...saveData.dataValues}, process.env.JWT_SECRET);

    await sendOtp(email, otp);

    const data = saveData.toJSON();
    delete data.password;

    data.token = token;
    return sendSuccessMessage(res,req, 201, "userCreatedSuccessfully", { data });
  } catch (error) {
    console.error(error);
    return senderrorMessage(res, 500, error.message);
  }
};
export const getList = async (req, res) => {
  try {
    const users = await User.findAll({});
    sendSuccessMessage(res,req, 200, "Usersfetchedsuccessfully", users );
  } catch (error) {
    console.error(error);
    senderrorMessage(res, 500, error.message);
  }
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    
    const user = await User.findOne({where:{email}});
    // console.log(user.da);
    if (!user) {
      return senderrorMessage(res,req, 400, "userNotFound");
    }

    if (user.dataValues.otp != otp) {
      return senderrorMessage(res,req, 400, "invalidOtp");
    }

    // if (user.otpExpiry < Date.now()) {
    //   return senderrorMessage(res, 400, 'OTP has expired');
    // }
    user.isEmailVerified = true;
    user.otp = null; 
    user.otpExpiry = null; 
    await user.save();

    sendSuccessMessage(res,req, 200, "emailVerifiedSuccessfully");
    
  } catch (error) {
    console.error(error);
    senderrorMessage(res, 500, error.message); 
  }
};
export const fileupload =async(req, res, next)=>{
  try {
    const uploadedFile = req.files.image;

    // const uploadPath = path.join(uploadDir, uploadedFile.name);
    // uploadedFile.mv(uploadPath, (err) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
  
    //   res.send(`File uploaded successfully: ${uploadedFile.name}`);
    // });

      // Construct the cross-platform file upload path
      const uploadPath = path.join(uploadDir, uploadedFile.name);

      // Move the uploaded file to the desired location
      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
  
        const fileUrl = `/uploads/${uploadedFile.name}`;
        sendSuccessMessage(res,req,200,"fileUploadedSuccessfully",
          { fileUrl: fileUrl,} )
        // res.send({
        //   message: 'File uploaded successfully',
        //   fileUrl: fileUrl,
        // });
      });

  } catch (error) {
    // console.error(error,'=====>>>>')
    senderrorMessage(res,500, error.message )
  }
};
export const login = async (req, res) => {
    const { email, password, deviceToken } = req.body;  
  
    if (!email || !password) {
     
      return senderrorMessage(res,req,400, "emailAndPasswordRequired" )
    }
    try {
      const user = await User.findOne({where:{ email} });

      if (!user) {
        
        return senderrorMessage(res,req,400, "userWithThisEmailDoesNotExist" )
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        
        return senderrorMessage(res,req,400, "Password is incorrect" )
      }
  
      if (deviceToken) {
        user.deviceToken = deviceToken;  
        await user.save();  
      }
  
      let userData=user.dataValues
      const token = jwt.sign({...userData}, process.env.JWT_SECRET);
      return sendSuccessMessage(res,req,200,"loginSuccessful",{user,token})
      
    } catch (err) {
      console.error(err);
      // res.status(500).json({ message: 'Server error' });
      // senderrorMessage(res,500,{message: 'Server error'});
      senderrorMessage(res,req,500, err.message )
    }
};
export const getUserInfo = async (req, res) => {
    try {
      const user = await User.findOne({where:{id:req.user.id},raw:true});
      if (!user) {
       return senderrorMessage(res,req,404, "userNotFound");
      }
      if (user.image) {
        
        let imageUrl = user.image.replace(/\\/g, '/');
  
        const fileName = path.basename(imageUrl);
        const encodedFileName = encodeURIComponent(fileName);
  
        const fullImagePath = `https://d4s0tw03-5000.inc1.devtunnels.ms/uploads/${encodedFileName}`;
        
        user.image = fullImagePath;
      }
     return sendSuccessMessage(res,req,200, "Detailsfetchedsuccessfully",user )
    } catch (err) {
      return senderrorMessage(res,500, err.message )
    }
};
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {

        if (!email) {
            return senderrorMessage(res, 400, 'Please provide an email');
          }

      const user = await User.findOne({ where:{email} });
      if (!user) {
        return senderrorMessage(res,404, 'User with this email does not exist' )
      }
  
      // const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp = crypto.randomInt(1000, 9999).toString(); 

      const otpExpiration = Date.now() + 10 * 60 * 1000;
  
      user.otp = otp;
      user.otpExpiry = otpExpiration;
      await user.save();
      sendSuccessMessage(res,req,200,"otpGeneratedSuccessfully",
       { otp: otp,
        expiresIn: otpExpiration,} )
  
  
    } catch (err) {
      console.error(err);
      senderrorMessage(res,500, err.message )
    }
};
export const otpverification = async (req, res) => {
  const { email, otp } = req.body;

  try {
    
    const user = await User.findOne({where:{email}});
   
    if (!user) {
      return senderrorMessage(res,req, 400, "userNotFound");
    }

    if (user.dataValues.otp != otp) {
      return senderrorMessage(res,req, 400, "invalidOtp");
    }

    if (user.otpExpiry < Date.now()) {
      return senderrorMessage(res,req, 400, "otpHasExpired");
    }
    user.isEmailVerified = true;
    user.otp = null; 
    user.otpExpiry = null; 
    await user.save();

    sendSuccessMessage(res,req, 200, "emailVerifiedSuccessfully",user);
    
  } catch (error) {
    console.error(error);
    senderrorMessage(res, 500, error.message); 
  }
};
export const changeRsetPassword=async(req, res, next) => {
  try{
    const {id}=req.query;
    const { password , confirmPassword}= req.body

    if(!id){
      senderrorMessage(res,req,400,"idIsRequired")
    }

    const response = await User.findOne({where: {id:id} ,raw:true})
    if(!response){
      senderrorMessage(res,req,404,"userNotFound")
    }
    if (password !== confirmPassword) {
      return senderrorMessage(res,req, 400, "passwordsDoNotMatch");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(
      { password: hashedPassword }, 
      { where: { id }} 
    );

    sendSuccessMessage(res,req,200,"passwordResetSuccessfully",{id})

  } catch(err){
     return senderrorMessage(res,500,err.message);
  }
};
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword} = req.body;

  // const passwordValidation = validatePassword(newPassword);
  // if (passwordValidation !== true) {
  //   return senderrorMessage(res, 400, passwordValidation);
  // }
  try {
    const user = await User.findOne({where:{id:req.user.id}});  
    if (!user) {
      return senderrorMessage(res,req, 404, "userNotFound");
    } 
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) { 
      return senderrorMessage(res,req, 400, "currentPasswordIsIncorrect");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    sendSuccessMessage(res,req, 200, "passwordUpdatedSuccessfully");
  } catch (error) {
    console.error(error);
    senderrorMessage(res, 500, error.message);
  }
};
export const logout = async (req, res) => {
  try {
 
    const userId = req.userId; 

    const user = await User.findOne(userId);
    
    if (!user) {
      return senderrorMessage(res,req, 404, "userNotFound");
    }

    user.deviceToken = null;  
    await user.save();

    return sendSuccessMessage(res,req, 200, "successfullyLoggedOut");
  } catch (err) {
    console.error(err);
    return senderrorMessage(res, 500, err.message);
  }
};
export const deleteAccount = async (req, res) => {
  try {
    
    const userId = req.userId;

    const user = await User.findOne(userId);
    
    if (!user) {
      return senderrorMessage(res,req, 404, "userNotFound");
    }

    await user.destroy();

    sendSuccessMessage(res,req, 200, "accountDeletedSuccessfully");
  } catch (err) {
    
    console.error(err);
    senderrorMessage(res, 500, err.message);
  }
};
export const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  try {

    if (!req.user || !req.user.id) {
      return senderrorMessage(res,req, 400, "userNotAuthenticated");
    }

    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return senderrorMessage(res,req, 404, "userNotFound");
    }

    if (name) {
      user.name = name;
    }

    if (phone) {
      user.phone = phone;
    }

    if(req.files && req.files.profilePicture){
      const uploadedFile = req.files.profilePicture;
      const uploadPath = path.join(uploadDir, uploadedFile.name);
    
      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
     } )
     user.image= `https://d4s0tw03-5000.inc1.devtunnels.ms/uploads/${uploadedFile.name}`; 
    }

    await user.save();

    sendSuccessMessage(res,req, 200, "profileUpdatedSuccessfully", {
     user
    });
  } catch (error) {
    console.error(error);
    
    senderrorMessage(res, 500, error.message);
  }
};
export const socialLogin = async (req, res) => {
  const { name, email, social_Id,socialType } = req.body;
  try {
    const existingUser = await User.findOne({where:{ social_Id} });
   
    if (existingUser) {
      let userData=existingUser.dataValues
       userData.isNewUser=false
      
      const token = jwt.sign({...userData}, process.env.JWT_SECRET);
      
      return sendSuccessMessage(res,req,200,"loginSuccessful",{userData,token})

    }else{
   
      if(!name, !email, !social_Id, !socialType){
        return senderrorMessage(res,req,400,"name,email,social_Id,socialTypeisrequired")
      }
     let response =  await User.create(req.body) 
     let data = response.dataValues
    
    data.isNewUser=true
    //  console.log(response.dataValues,"============")
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return sendSuccessMessage(res,req, 201, "Usercreatedsuccessfull", { data,token});
    }

  } catch (error) {
    console.log(error)
    return senderrorMessage(res,req,500,error.message)
  }
};
