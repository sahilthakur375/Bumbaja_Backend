import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js"
import contactInfo from './contactInfo.js';

const otherInformation = sequelize.define('otherInformation',{
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
      aboutMe:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
},{
    timestamps: true,
    tableName: 'otherInformation',
  });
  contactInfo.hasMany(otherInformation, { foreignKey: 'contactId' });  


export default otherInformation;
