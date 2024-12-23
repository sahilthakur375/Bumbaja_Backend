import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import otherInformation from "./otherInformation.js"

const otherInfoLang =sequelize.define('otherinfolang',{
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
    language: {
        type: DataTypes.STRING,
        allowNull:true,
       },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
       },
},{
    timestamps: true,
    tableName: 'otherinfolang',
  });

  // otherInfoLang.belongsTo(otherInformation, { foreignKey: 'otherInfoid' });
  otherInformation.hasMany(otherInfoLang, { foreignKey: 'otherInfoid', as: 'languages', }); 
  export default otherInfoLang;
