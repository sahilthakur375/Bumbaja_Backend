import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import otherInformation from "./otherInformation.js";

const otherInfoRef =sequelize.define('otherReference',{
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
    companyName: {
        type: DataTypes.STRING,
        allowNull:true,
       },
    personName: {
        type: DataTypes.STRING,
        allowNull: true,
       },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
       },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
       },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
       },
},{
    timestamps: true,
    tableName: 'otherReference',
  });

  otherInformation.hasMany(otherInfoRef, { foreignKey: 'otherInfoid', as: 'references' }); 

  export default otherInfoRef;
