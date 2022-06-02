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
    Slot1: {
      type: Sequelize.STRING,
    },
    Slot2: {
      type: Sequelize.STRING,
    },
    Slot3: {
      type: Sequelize.STRING,
    },
    Slot4: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
