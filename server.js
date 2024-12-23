import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/authpages.js';
import templatesRoutes from './routes/authtemplates.js';
import createCVRoutes from './routes/authcreatecv.js';
import newCvROutes from './routes/authnewCv.js'
import { fileURLToPath } from 'url';
import fileUpload from "express-fileupload"
import path from 'path';
import sequelize from './config/db.config.js'; 
import i18next from 'i18next';
import morgan from 'morgan'
import i18nextMiddleware from 'i18next-http-middleware'
import fsBackend from 'i18next-fs-backend'
// const i18nextMiddleware = require('i18next-http-middleware');
// const fsBackend = require('i18next-fs-backend');

dotenv.config();

const app = express();


const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

i18next
  .use(i18nextMiddleware.LanguageDetector)  
  .use(fsBackend)  
  .init({
    fallbackLng: 'en',
    preload: ['en', 'pt', 'fr'], 
    backend: {
      loadPath: './locales/{{lng}}/translation.json', 
    },
  });
  app.use(i18nextMiddleware.handle(i18next));
app.use(morgan('dev'));

// app.use(i18n.init);
// app.use((req, res, next) => {
//   const lang = req.headers.lang || 'en';
//   req.setLocale(lang);
//   next();
// });

app.use(express.json());  
app.use(cors());  

app.use('/uploads', express.static('uploads'));

app.use('/', authRoutes);
app.use('/', pageRoutes);
app.use('/',templatesRoutes)
app.use('/',createCVRoutes);
app.use('/',newCvROutes);
// Sync Sequelize models with the database (create tables if they don't exist)
// Call the connectDatabase function to establish the DB connection and sync models

async function connectDatabase() {
  try {
    await sequelize.authenticate();  // Authenticate the Sequelize connection
    console.log('Database connection established successfully');
    // Sync all models (create tables if they don't exist)
    // await sequelize.sync();
    // console.log('All models were synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);  
  }
}

connectDatabase()

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`)});
   