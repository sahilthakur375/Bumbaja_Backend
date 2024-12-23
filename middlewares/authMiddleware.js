import jwt from 'jsonwebtoken';
import {senderrorMessage} from '../utils/responseHelper.js';

export const authenticaterToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    // return res.status(403).json({ message: 'Token is required' });
    return senderrorMessage(res,403, 'Token is required');

  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    console.error(err);
    // res.status(403).json({ message: 'Invalid or expired token' });
    senderrorMessage(res,403, 'Invalid or expired token');
  }
};

// export const deleteCV = async (req, res) => {


//   const { id } = req.params;
//   const t = await sequelize.transaction();  

//   try {
      
//       const deletedContactInfo = await contactInfo.destroy({
//           where: { id },
//           transaction: t
//       });

//       if (deletedContactInfo === 0) {
//           return senderrorMessage(res, 404, `Contact information with id ${id} not found or already deleted`);
//       }

//       await t.commit();

//       return sendSuccessMessage(res, 200, 'CV deleted successfully');
//   } catch (error) {
      
//       await t.rollback();
//       return senderrorMessage(res, 500, error.message);
//   }
// };