import express from 'express';
import {pages,getPageInfo} from '../controllers/pagesController.js'

const router = express.Router();

router.post('/pages', pages);

router.get('/getPageInfo', getPageInfo);

export default router;
