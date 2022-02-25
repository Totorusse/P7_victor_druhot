module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: Sequelize.STRING,
    },
    userName: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    pubId: {
      type: Sequelize.INTEGER,
    },
  });
  return Comment;
};
