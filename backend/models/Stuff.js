module.exports = (sequelize, Sequelize) => {
  const Stuff = sequelize.define("stuff", {
    code: {
      type: Sequelize.STRING,
    },
    nom: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    isUsed: {
      type: Sequelize.BOOLEAN,
    },
    slotSup: {
      type: Sequelize.INTEGER,
    },
  });
  return Stuff;
};
