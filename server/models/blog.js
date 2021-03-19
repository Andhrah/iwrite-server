import { Model } from 'sequelize';

/**
 * A model class representing user resource
 *
 * @param {Sequelize} sequelize - Sequelize object
 * @param {Sequelize.DataTypes} DataTypes - A convinient object holding data types
 * @return {Sequelize.Model} - User model
*/
export default (sequelize, DataTypes) => {
  /**
   * @type {Sequelize.Model}
  */

  /**
   * A model class representing user resource
   *
   * @class Blog
  */
  class Blog extends Model {
    /**
     * @static
     * @param {Object} models - Model object
     * @returns {void}
     */
    static associate(models) {
      /*
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */

      // define association here
      Blog.belongsTo(models.User, {
        onDelete: 'CASCADE',
        targetKey: 'id',
        foreignKey: 'authorId'
      });
    }
  }
  Blog.init({
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Blog', // We need to choose the model name
  });
  return Blog;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Blog extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Blog.init({
//     title: DataTypes.STRING,
//     body: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'Blog',
//   });
//   return Blog;
// };
