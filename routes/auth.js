import express from 'express';
import { signup, verifyOtp, login,forgotPassword,otpverification, getUserInfo, fileupload,changePassword,logout,deleteAccount, getList, updateProfile, changeRsetPassword,socialLogin} from '../controllers/authController.js';
import { authenticaterToken } from '../middlewares/authMiddleware.js'; 


const router = express.Router();

router.post('/signup', signup);
router.get('/getList', getList);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/otpverification', otpverification);
router.post('/changeRsetPassword', changeRsetPassword);
router.get('/user',authenticaterToken ,getUserInfo);
router.post('/fileUpload',fileupload);
router.put('/changePassword',authenticaterToken, changePassword)
router.post('/logout',authenticaterToken,logout)
router.delete('/deleteAccount',authenticaterToken,deleteAccount)
router.put('/updateprofile',authenticaterToken, updateProfile)
router.post('/socialLogin',socialLogin)

export default router;
