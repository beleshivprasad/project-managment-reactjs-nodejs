"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Blogs", [
      {
        title: "First Blog Title",
        desc: "First Blog Description",
        author: "shiv@gmail.com",
        comment: "This is the Comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Second Blog Title",
        desc: "Second Blog Description",
        author: "sammed@gmail.com",
        comment: "This is the Comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Second Blog Title",
        desc: "Second Blog Description",
        author: "arvind@gmail.com",
        comment: "This is the Comment",
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
    return queryInterface.bulkDelete("Blogs", {}, null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
