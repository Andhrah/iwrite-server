import bcrypt from 'bcrypt';
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
   * @class User
  */
  class User extends Model {
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
      User.hasOne(models.Profile, { foreignKey: 'userId' });
      User.hasMany(models.Blog, { foreignKey: 'authorId' });
    }
  }
  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: { msg: 'Must be a valid email address' }
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
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
    modelName: 'User', // We need to choose the model name
  });
  return User;
};
