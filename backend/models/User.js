module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    psw: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
    heros: {
      type: Sequelize.STRING,
    },
    mainG: {
      type: Sequelize.STRING,
    },
    mainD: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
