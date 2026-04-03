const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordChangeAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'users'


}
);
module.exports = User;