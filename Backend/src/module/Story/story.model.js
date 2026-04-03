const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Story = sequelize.define('Story', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaType: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'stories'
});

module.exports = Story;