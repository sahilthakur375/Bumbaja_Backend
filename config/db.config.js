import { Sequelize } from 'sequelize';


// Create a Sequelize instance to connect to your database
const sequelize = new Sequelize({
  dialect: 'mysql', // or 'mysql', 'sqlite'
  host: 'localhost',
  username: 'root', // your database username
  password: '', // your database password
  database: 'resume', // your database name
//   logging: console.log, // Optional: if you want to log SQL queries
});

// async function connectDatabase() {
//     try {
// // Test the connection
// await sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
// } catch(err)  {
//     console.error('Unable to connect to the database:', err);
//   };
// }
 export default  sequelize;
