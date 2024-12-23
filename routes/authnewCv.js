import express from 'express';
import {
  createCV,
  getCV,
  updateCV,
  deleteCV
} from '../controllers/newCvController.js';

const router = express.Router();

router.post('/createcv', createCV);

router.get('/cv/:id', getCV);

router.put('/cv/:id',updateCV)

router.delete('/cv/:id',deleteCV)    

export default router;
