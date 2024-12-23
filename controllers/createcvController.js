import contactInfo from "../models/createNewCv/contactInfo.js";
import workExperience from "../models/createNewCv/workExperience.js";
import educationDetails from "../models/createNewCv/educationDetails.js";
import otherInformation from "../models/createNewCv/otherInformation.js";
import otherInfoLang from "../models/createNewCv/otherInfoLang.js";
import otherInfoRef from "../models/createNewCv/otherInfoReference.js";
import otherInfoSkills from "../models/createNewCv/otherSkills.js"
import sequelize from "../config/db.config.js";

import { sendSuccessMessage, senderrorMessage } from "../utils/responseHelper.js";

export const contactinfo = async(req, res)=>{
    try {
        const {userId,image,name,email,phone,homeAddress,zipcode,city} = req.body;
        // if(!userId ||!image ||!name ||!email ||!phone ||!homeAddress ||!zipcode ||!city){
        //     return senderrorMessage(res,400, 'All fields are required');
        // }
        // console.log(req.body,"===========>>>>>>>>>")
        const response = await contactInfo.create(req.body)
        // console.log(response,"===========>>>>>>>>>")
        return sendSuccessMessage(res,201,'Contact information added successfully',(response));
    } catch (error) {
        return senderrorMessage(res,500, error.message)
    }
};
export const contactinfoGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await contactInfo.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Info not found');
        }

        return sendSuccessMessage(res, 200, 'Info fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const contactinfoUpdate = async(req,res)=>{
    try {
         const {image,name,email,phone,homeAddress,zipcode,city,otherDetails} = req.body;
         const {id} =req.params
         const details = await contactInfo.update(req.body,{where: { id: id   }});
         const detail = await contactInfo.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Details updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const contactinfoDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await contactInfo.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Contact info not found');
        }

        return sendSuccessMessage(res, 200, 'Contact info deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const workexperience = async(req,res) => {
    try {
        const {contactId,userId,employer,jobTitle,startDate,endDate,location,description} = req.body;
        // if(!contactId ||!userId ||!employer ||!jobTitle ||!startDate ||!endDate ||!location ||!description){
        //     return senderrorMessage(res,400, 'All fields are required');
        // }
        const employee = await workExperience.create(req.body)
        return sendSuccessMessage(res,201,'Work experience added successfully',(employee));
    } catch (error) {
        return senderrorMessage(res,500, error.message);
    }
};
export const workexperienceGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await workExperience.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Info not found');
        }

        return sendSuccessMessage(res, 200, 'Info fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const workexperienceUpdate = async(req,res)=>{
    try {
         const {employer,jobTitle,startDate,endDate,location,description,otherDetails} = req.body;
         const {id} =req.params
         const details = await workExperience.update(req.body,{where: { id: id   }});
         const detail = await workExperience.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Details updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const workexperienceDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await workExperience.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Work experience not found');
        }

        return sendSuccessMessage(res, 200, 'Work experience deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const educationdetails = async(req,res)=>{
    try {
        const {contactId,userId,school,location,startDate,endDate,degree,subjects,description} = req.body;
        // if(!contactId ||!userId ||!school ||!location ||!startDate ||!endDate ||!degree ||!subjects ||!description){
        //     return senderrorMessage(res,400, 'All fields are required');
        // }
        const education = await educationDetails.create(req.body);
        return sendSuccessMessage(res,201,'Education details added successfully',(education));
    } catch (error) {
        return senderrorMessage(res,500,error.message);
    }
};
export const educationdetailsGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await educationDetails.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Education details not found');
        }

        return sendSuccessMessage(res, 200, 'Education details fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const educationdetailsUpdate = async(req,res)=>{
    try {
         const {school,location,startDate,endDate,degree,subjects,description,otherDetails} = req.body;
         const {id} =req.params
         const details = await educationDetails.update(req.body,{where: { id: id   }});
         const detail = await educationDetails.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Educational details updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const educationdetailsDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await educationDetails.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Education details not found');
        }

        return sendSuccessMessage(res, 200, 'Education details deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const otherinfo = async(req,res)=>{
    try {
        const {userId,contactId,aboutMe} = req.body;
        // if(!userId ||!contactId ||!aboutMe){
        //     return senderrorMessage(res,400, 'About me field is required');
        // }
        const other = await otherInformation.create(req.body);
        return sendSuccessMessage(res,201,'Other information added successfully',(other));
    } catch (error) {
        return senderrorMessage(res,500,error.message);
    }
};
export const otherinfoGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await otherInformation.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'other info not found');
        }

        return sendSuccessMessage(res, 200, 'other info fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherinfoUpdate = async(req,res)=>{
    try {
         const {aboutMe} = req.body;
         const {id} =req.params
         const details = await otherInformation.update(req.body,{where: { id: id   }});
         const detail = await otherInformation.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Other info updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherinfoDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await otherInformation.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Other info not found');
        }

        return sendSuccessMessage(res, 200, 'Other info deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const otherLang = async(req,res)=>{
    try {
        const {otherInfoid,language, level} = req.body;
        
        const otherLang = await otherInfoLang.create(req.body);
        
        return sendSuccessMessage(res,201,'Language added successfully',(otherLang));
    } catch (error) {
        return senderrorMessage(res,500,error.message);
    }
};
export const otherLangGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await otherInfoLang.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Language not found');
        }

        return sendSuccessMessage(res, 200, 'Language fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherLangUpdate = async(req,res)=>{
    try {
         const {language,level} = req.body;
         const {id} =req.params
         const details = await otherInfoLang.update(req.body,{where: { id: id   }});
         const detail = await otherInfoLang.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Language updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherLangDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await otherInfoLang.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Language not found');
        }

        return sendSuccessMessage(res, 200, 'Language deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const otherRef = async(req,res)=>{
    try {
        const{otherInfoid,companyName,personName,email,phone,description} = req.body;
        const otherRef = await otherInfoRef.create(req.body);
        return sendSuccessMessage(res,201,'References added successfully',(otherRef));
    } catch (error) {
        return senderrorMessage(res,500,error.message);
    }
};
export const otherRefGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await otherInfoRef.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Reference not found');
        }

        return sendSuccessMessage(res, 200, 'Reference fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherRefUpdate = async(req,res)=>{
    try {
         const {companyName,personName,email,phone,description} = req.body;
         const {id} =req.params
         const details = await otherInfoRef.update(req.body,{where: { id: id   }});
         const detail = await otherInfoRef.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'Reference updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherRefDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await otherInfoRef.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Reference not found');
        }

        return sendSuccessMessage(res, 200, 'Reference deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};

export const otherSkills = async(req,res)=>{
    try {
        const{otherInfoid,communicationSkills,problemSolvingSkills} = req.body;
        const otherRef = await otherInfoSkills.create(req.body);
        return sendSuccessMessage(res,201,'Skills added successfully',(otherRef));
    } catch (error) {
        return senderrorMessage(res,500,error.message);
    }
};
export const otherSkillsGet = async (req, res) => {
    try {
       
        const { id } = req.params;  
   
        const details = await otherInfoSkills.findOne({where: { id: id   }});
      
        if (!details) {
            return senderrorMessage(res, 404, 'Skills not found');
        }

        return sendSuccessMessage(res, 200, 'Skills fetched successfully', details);
    } catch (error) {
     
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherSkillsUpdate = async(req,res)=>{
    try {
         const {communicationSkills,problemSolvingSkills} = req.body;
         const {id} =req.params
         const details = await otherInfoSkills.update(req.body,{where: { id: id   }});
         const detail = await otherInfoSkills.findOne({where: { id: id   }});
         return sendSuccessMessage(res,200,'SKills updated successfully',detail);
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};
export const otherSkillsDelete = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedCount = await otherInfoSkills.destroy({
            where: {
                id: id  
            }
        });

        if (deletedCount === 0) {
            return senderrorMessage(res, 404, 'Skills not found');
        }

        return sendSuccessMessage(res, 200, 'Skills deleted successfully');
    } catch (error) {
        return senderrorMessage(res, 500, error.message);
    }
};




 
// {
//     "contactInfo": {
//         "userId": "1",
//         "image": "profile-pic.jpg",
//         "name": "John Doe",
//         "email": "john.doe@example.com",
//         "phone": "+1234567890",
//         "homeAddress": "123 Elm Street, Springfield, IL",
//         "zipcode": "62701",
//         "city": "Springfield"
//     },
//     "workExperience": {
//         "contactId": "1",
//         "userId": "1",
//         "employer": "Tech Solutions Inc.",
//         "jobTitle": "Software Engineer",
//         "startDate": "2020-01-15",
//         "endDate": "2023-03-30",
//         "location": "Remote",
//         "description": "Developed and maintained web applications using JavaScript, Node.js, and React."
//     },
//     "educationDetails": {
//         "contactId": "1",
//         "userId": "1",
//         "school": "University of Springfield",
//         "location": "Springfield, IL",
//         "startDate": "2015-09-01",
//         "endDate": "2019-05-20",
//         "degree": "Bachelors in Computer Science",
//         "subjects": "Data Structures","Algorithms","Database Systems",  
        
//         "description": "Focused on software engineering principles and application development."
//     },
//     "otherInformation": {
//         "userId": "1",
//         "contactId": "1",
//         "aboutMe": "A passionate software engineer with a strong background in web development and problem solving.",
//          }
//         "otherInfoLang": [
//             {
//                 "otherInfoid": "1",
//                 "language": "Spanish",
//                 "level": "Intermediate"
//             },
//             {
//                 "otherInfoid": "1",
//                 "language": "French",
//                 "level": "Basic"
//             }
//         ],
//         "otherInfoRef": [
//             {
//                 "otherInfoid": "1",
//                 "companyName": "Tech Solutions Inc.",
//                 "personName": "Jane Smith",
//                 "email": "jane.smith@techsolutions.com",
//                 "phone": "+1234567891",
//                 "description": "Provided mentorship and support throughout my time at Tech Solutions."
//             },
//             {
//                 "otherInfoid": "1",
//                 "companyName": "WebWorks Ltd.",
//                 "personName": "Emily Johnson",
//                 "email": "emily.johnson@webworks.com",
//                 "phone": "+1234567892",
//                 "description": "Worked closely on multiple projects, offering guidance and assistance in frontend development."
//             }
//         ],
//         "otherInfoSkills": [
//             {
//                 "otherInfoid": "1",
//                 "communicationSkills": "Excellent verbal and written communication skills.",
//                 "problemSolvingSkills": "Strong problem-solving abilities, particularly in software development and debugging."
//             },
//             {
//                 "otherInfoid": "1",
//                 "communicationSkills": "Excellent verbal and written communication skills.",
//                 "problemSolvingSkills": "Strong problem-solving abilities, particularly in software development and debugging."
//             }
//         ]
//     }
// }