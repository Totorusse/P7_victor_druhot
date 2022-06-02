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
    Slot5: {
      type: Sequelize.STRING,
    },
    Slot6: {
      type: Sequelize.STRING,
    },
    Slot7: {
      type: Sequelize.STRING,
    },
    Slot8: {
      type: Sequelize.STRING,
    },
    Slot9: {
      type: Sequelize.STRING,
    },
    Slot10: {
      type: Sequelize.STRING,
    },
    Slot11: {
      type: Sequelize.STRING,
    },
    Slot12: {
      type: Sequelize.STRING,
    },
    Slot13: {
      type: Sequelize.STRING,
    },
    Slot14: {
      type: Sequelize.STRING,
    },
    Slot15: {
      type: Sequelize.STRING,
    },
    Slot16: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
