import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js"


const contactInfo = sequelize.define('contactinfo',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
        validate: {
          isEmail: true,
        }},
      phone: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: true,
          },
      homeAddress: {
            type: DataTypes.STRING,
            allowNull: true,
          },
       zipcode:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        city:{
            type: DataTypes.STRING,
            allowNull: true
        },
        otherDetails:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
},{
    timestamps: true,
    tableName: 'contactinfo',
  });

export default contactInfo;
  