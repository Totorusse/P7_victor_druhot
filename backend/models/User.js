module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    psw: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
