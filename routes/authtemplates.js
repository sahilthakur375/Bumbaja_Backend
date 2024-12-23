import express from 'express';
import {templates,getTemplateInfo} from '../controllers/templatesController.js'

const router = express.Router();

router.post('/templates', templates);

router.get('/getTemplateInfo',getTemplateInfo)

export default router;
