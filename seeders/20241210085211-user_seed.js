"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nama_lengkap: "User",
          username: "user",
          password:
            "$2a$12$Zmauwx5mT91f4QzAKEyqW.NyArjzR3rqpMUjoq0ER6NoP4fykJbfS",
          role: "sysadmin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
