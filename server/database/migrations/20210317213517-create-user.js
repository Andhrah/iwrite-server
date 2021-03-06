export default {
  /**
   * Run the migration
   *
   * @param {Sequelize.QueryInterface} queryInterface - The interface that communicates
   * with the database.
   * @param {Sequelize} Sequelize - Sequelize object.
   * @return {void}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * Reverse the migration
   *
   * @param {Sequelize.QueryInterface} queryInterface - The interface that communicates
   * with the database.
   * @param {Sequelize} Sequelize - Sequelize object.
   * @return {void}
   */
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
