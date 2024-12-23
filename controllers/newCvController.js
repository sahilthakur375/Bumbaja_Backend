import contactInfo from '../models/createNewCv/contactInfo.js';
import workExperience from '../models/createNewCv/workExperience.js';
import educationDetails from '../models/createNewCv/educationDetails.js';
import otherInformation from '../models/createNewCv/otherInformation.js';
import otherInfoLang from '../models/createNewCv/otherInfoLang.js';
import otherInfoRef from '../models/createNewCv/otherInfoReference.js';
import otherInfoSkills from '../models/createNewCv/otherSkills.js';
import sequelize from '../config/db.config.js';

import { sendSuccessMessage, senderrorMessage } from '../utils/responseHelper.js';

export const createCV = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    
    const contactInfoResponse = await contactInfo.create(req.body.contactInfo, { transaction: t });

    if (req.body.workExperience) {
      for (const exp of req.body.workExperience) {
        await workExperience.create({ ...exp, contactId: contactInfoResponse.id }, { transaction: t });
      }
    }

    if (req.body.educationDetails) {
      for (const edu of req.body.educationDetails) {
        await educationDetails.create({ ...edu, contactId: contactInfoResponse.id }, { transaction: t });
      }
    }

    const otherInfo = await otherInformation.create({
      userId: contactInfoResponse.userId,
      contactId: contactInfoResponse.id,
      aboutMe: req.body.otherInformation.aboutMe,
    }, { transaction: t });

    if (req.body.otherInfoLang) {
      for (const lang of req.body.otherInfoLang) {
        await otherInfoLang.create({ ...lang, otherInfoid: otherInfo.id }, { transaction: t });
      }
    }

    if (req.body.otherInfoRef) {
      for (const ref of req.body.otherInfoRef) {
        await otherInfoRef.create({ ...ref, otherInfoid: otherInfo.id }, { transaction: t });
      }
    }

    if (req.body.otherInfoSkills) {
      for (const skill of req.body.otherInfoSkills) {
        await otherInfoSkills.create({ ...skill, otherInfoid: otherInfo.id }, { transaction: t });
      }
    }

    await t.commit();

    return sendSuccessMessage(res,req, 201, "cv_created_successfully", contactInfoResponse);
  } catch (error) {
    await t.rollback();
    return senderrorMessage(res, 500, error.message);
  }
};
export const getCV = async (req, res) => {
  const { id } = req.params;
  try {
    
    const contact = await contactInfo.findOne({
      where: { id},
      include: [
        {
          model: workExperience
        },
        {
          model: educationDetails
        },
        {
          model: otherInformation,
          include: [
            { model: otherInfoLang, as: 'languages' },
            { model: otherInfoRef, as: 'references' },
            { model: otherInfoSkills, as: 'skills' },
          ],
        },
      ],
    });

    if (!contact) {
      return senderrorMessage(res,req, 404, "cv_not_found");
    }

    return sendSuccessMessage(res,req, 200, "cv_fetched_successfully", contact);
  } catch (error) {
    return senderrorMessage(res, 500, error.message);
  }
};      

export const updateCV = async (req, res) => {
    const t = await sequelize.transaction();
  
    try {
      const {
        contactInfo: contactInfoData,
        workExperience: workExperienceData,
        educationDetails: educationDetailsData,
        otherInformations: otherInformationData,
      } = req.body;
  
      const { id } = req.params;  
      const updatedCon = await contactInfo.findByPk(id)

      if(!updatedCon){
        return senderrorMessage(res,req, 404, "cv_not_found");
      }

  
      if (contactInfoData) {
        const [updatedContactRows] = await contactInfo.update(contactInfoData, {
          where: { id },
          transaction: t,
        });
  
        if (updatedContactRows === 0) {
          console.log(`Contact information with id ${id} not found or updated`);
        }
      }
  
      if (workExperienceData && Array.isArray(workExperienceData)) {
        for (const workExp of workExperienceData) {
          console.log("Work Experience ID:", workExp.id);
  
          if (workExp.id) {
            const [updatedWorkExpRows] = await workExperience.update(workExp, {
              where: { contactId: id, id: workExp.id },
              transaction: t,
            });
  
            if (updatedWorkExpRows === 0) {
              console.log(`Work experience with id ${workExp.id} not found or updated`);
            }
          } else {
            console.log("Work experience ID is undefined!");
          }
        }
      }
  
      if (educationDetailsData && Array.isArray(educationDetailsData)) {
        for (const educationDetail of educationDetailsData) {
          console.log("Education Detail ID:", educationDetail.id);
  
          if (educationDetail.id) {
            const [updatedEducationRows] = await educationDetails.update(educationDetail, {
              where: { contactId: id, id: educationDetail.id },
              transaction: t,
            });
  
            if (updatedEducationRows === 0) {
              console.log(`Educational details with id ${educationDetail.id} not found or updated`);
            }
          } else {
            console.log("Education detail ID is undefined!");
          }
        }
      }
  
      if (otherInformationData && Array.isArray(otherInformationData)) {
        for (const otherinfo of otherInformationData) {
          console.log("Other Info ID:", otherinfo.id);
  
          if (otherinfo.id) {
            const [updatedOtherInfoRows] = await otherInformation.update(otherinfo, {
              where: { contactId: id, id: otherinfo.id },
              transaction: t,
            });
  
            if (updatedOtherInfoRows === 0) {
              console.log(`Other information with id ${otherinfo.id} not found or updated`);
            }
  
            
            if (Array.isArray(otherinfo.languages)) {
              console.log("Languages to update:", otherinfo.languages);
              for (const language of otherinfo.languages) {
                if (language.id) {
                  const [updatedLangRows] = await otherInfoLang.update(language, {
                    where: { id: language.id, otherInfoid: otherinfo.id },
                    transaction: t,
                  });
  
                  if (updatedLangRows === 0) {
                    console.log(`Language with id ${language.id} not found or updated`);
                  }
                }
              }
            }
  
            
            if (Array.isArray(otherinfo.references)) {
              console.log("References to update:", otherinfo.references);
              for (const reference of otherinfo.references) {
                console.log("Reference ID:", reference.id);
                if (reference.id) {
                  const [updatedRefRows] = await otherInfoRef.update(reference, {
                    where: { id: reference.id, otherInfoid: otherinfo.id },
                    transaction: t,
                  });
  
                  if (updatedRefRows === 0) {
                    console.log(`Reference with id ${reference.id} not found or updated`);
                  }
                }
              }
            }
  
            
            if (Array.isArray(otherinfo.skills)) {
              console.log("Skills to update:", otherinfo.skills);
              for (const skill of otherinfo.skills) {
                console.log("Skill ID:", skill.id);
                if (skill.id) {
                  const [updatedSkillRows] = await otherInfoSkills.update(skill, {
                    where: { id: skill.id, otherInfoid: otherinfo.id },
                    transaction: t,
                  });
  
                  if (updatedSkillRows === 0) {
                    console.log(`Skill with id ${skill.id} not found or updated`);
                  }
                }
              }
            }
          }
        }
      }
  
      await t.commit();
      // return res.status(200).json({ message: 'CV updated successfully' });
      return sendSuccessMessage(res,req,200,"cv_updated_successfully")
  
    } catch (error) {
      
      await t.rollback();
      console.error(error);
      return senderrorMessage(res,req,500,error.message)
    }
  };
  

  
export const deleteCV = async (req, res) => {
      const { id } = req.params;
      const t = await sequelize.transaction();  
    
      try {
          
          const deletedContactInfo = await contactInfo.destroy({
              where: { id },
              transaction: t
          });
    
          if (deletedContactInfo === 0) {
              return senderrorMessage(res, 404, `Contact information with id ${id} not found or already deleted`);
          }
    
          await t.commit();
    
          return sendSuccessMessage(res,req, 200, "cv_deleted_successfully");
      } catch (error) {
          
          await t.rollback();
          return senderrorMessage(res, 500, error.message);
      }
};
  
  
  
   
