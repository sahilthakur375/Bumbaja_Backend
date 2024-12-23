import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js"
import contactInfo from "./contactInfo.js";


const educationDetails = sequelize.define('educationDetails',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contactId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      school: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
          },
      startDate: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      endDate: {
            type: DataTypes.STRING,
            allowNull: true,
          },
       degree:{
            type: DataTypes.STRING,
            allowNull: true,
          },
        subjects:{
            type: DataTypes.STRING,
            allowNull: true
        },
        description:{
          type: DataTypes.STRING,
          allowNull: true
      },
      otherDetails:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },

},{
    timestamps: true,
    tableName: 'educationDetails',
  });

  contactInfo.hasMany(educationDetails, { foreignKey: 'contactId' });  

export default educationDetails;
