import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import otherInformation from "./otherInformation.js";

const otherInfoSkills =sequelize.define('otherSkills',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    otherInfoid: {
        type: DataTypes.STRING,
        allowNull:true,
       },
    communicationSkills: {
        type: DataTypes.STRING,
        allowNull:true,
       },
    problemSolvingSkills: {
        type: DataTypes.STRING,
        allowNull: true,
       },
},{
    timestamps: true,
    tableName: 'otherSkills',
  });
  otherInformation.hasMany(otherInfoSkills, { foreignKey: 'otherInfoid', as: 'skills' }); 

  export default otherInfoSkills;
