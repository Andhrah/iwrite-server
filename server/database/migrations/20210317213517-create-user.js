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
        type: Sequelize.STRING
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
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
