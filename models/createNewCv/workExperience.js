import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import contactInfo from "./contactInfo.js";

// Define the 'workExperience' model
const workExperience = sequelize.define(
  "workExperience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobTitle: {
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
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otherDetails: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "workExperience",
  }
);

// // Define the association
// // workExperience.associate = (models) => {
// workExperience.belongsTo(contactInfo, { foreignKey: 'contactId',onDelete: 'CASCADE' });
// // }
contactInfo.hasMany(workExperience, { foreignKey: 'contactId' });  

export default workExperience;
