"use strict";
const encryptPassword = require("../utils/encryptPassword");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        fname: "shiv",
        lname: "bele",
        email: "shiv@gmail.com",
        password: await encryptPassword("11111111"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fname: "arvind",
        lname: "singh",
        email: "arvind@gmail.com",
        password: await encryptPassword("22222222"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fname: "sammed",
        lname: "chogule",
        email: "sammed@gmail.com",
        password: await encryptPassword("33333333"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {}, null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
