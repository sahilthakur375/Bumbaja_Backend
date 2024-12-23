import express from 'express';
import {contactinfo,workexperience,educationdetails,otherinfo,otherLang,otherRef,otherSkills,contactinfoGet,contactinfoUpdate,contactinfoDelete,workexperienceGet,workexperienceUpdate,workexperienceDelete,educationdetailsGet,educationdetailsUpdate,educationdetailsDelete,otherinfoGet,otherinfoUpdate,otherinfoDelete,otherLangGet,otherLangUpdate,otherLangDelete,otherRefGet,otherRefUpdate,otherRefDelete,otherSkillsGet,otherSkillsUpdate,otherSkillsDelete} from '../controllers/createcvController.js';

const router = express.Router();

// router.post('/createContactInfo', createContactInfo);

router.post('/contactinfo',contactinfo);
router.get('/contactinfoGet/:id',contactinfoGet);
router.put('/contactinfoUpdate/:id',contactinfoUpdate);
router.delete('/contactinfoDelete/:id',contactinfoDelete);

router.post('/workexperience', workexperience);
router.get('/workexperienceGet/:id',workexperienceGet);
router.put('/workexperienceUpdate/:id',workexperienceUpdate);
router.delete('/workexperienceDelete/:id',workexperienceDelete);

router.post('/educationdetails', educationdetails);
router.get('/educationdetailsGet/:id',educationdetailsGet);
router.put('/educationdetailsUpdate/:id',educationdetailsUpdate);
router.delete('/educationdetailsDelete/:id',educationdetailsDelete);

router.post('/otherinfo', otherinfo);
router.get('/otherinfoGet/:id',otherinfoGet);
router.put('/otherinfoUpdate/:id',otherinfoUpdate);
router.delete('/otherinfoDelete/:id',otherinfoDelete);

router.post('/otherlanguage', otherLang);
router.get('/otherLangGet/:id',otherLangGet);
router.put('/otherLangUpdate/:id',otherLangUpdate);
router.delete('/otherLangDelete/:id',otherLangDelete);

router.post('/otherreference', otherRef);
router.get('/otherRefGet/:id',otherRefGet);
router.put('/otherRefUpdate/:id',otherRefUpdate);
router.delete('/otherRefDelete/:id',otherRefDelete);

router.post('/otherskills', otherSkills);
router.get('/otherSkillsGet/:id',otherSkillsGet);
router.put('/otherSkillsUpdate/:id',otherSkillsUpdate);
router.delete('/otherSkillsDelete/:id',otherSkillsDelete);

export default router;
