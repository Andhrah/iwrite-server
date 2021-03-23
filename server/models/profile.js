import { Model } from 'sequelize';

/**
 * A model class representing user resource
 *
 * @param {Sequelize} sequelize - Sequelize object
 * @param {Sequelize.DataTypes} DataTypes - A convinient object holding data types
 * @return {Sequelize.Model} - Profile model
*/
export default (sequelize, DataTypes) => {
  /**
   * @type {Sequelize.Model}
  */

  /**
   * A model class representing user resource
   *
   * @class Profile
  */
  class Profile extends Model {
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
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Profile.init({
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING
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
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Profile', // We need to choose the model name
  });
  return Profile;
};
