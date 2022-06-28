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
    isConnected: {
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
    received: {
      type: Sequelize.STRING,
    },
    slot1: {
      type: Sequelize.STRING,
    },
    slot2: {
      type: Sequelize.STRING,
    },
    slot3: {
      type: Sequelize.STRING,
    },
    slot4: {
      type: Sequelize.STRING,
    },
    slot5: {
      type: Sequelize.STRING,
    },
    slot6: {
      type: Sequelize.STRING,
    },
    slot7: {
      type: Sequelize.STRING,
    },
    slot8: {
      type: Sequelize.STRING,
    },
    slot9: {
      type: Sequelize.STRING,
    },
    slot10: {
      type: Sequelize.STRING,
    },
    slot11: {
      type: Sequelize.STRING,
    },
    slot12: {
      type: Sequelize.STRING,
    },
    slot13: {
      type: Sequelize.STRING,
    },
    slot14: {
      type: Sequelize.STRING,
    },
    slot15: {
      type: Sequelize.STRING,
    },
    slot16: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
