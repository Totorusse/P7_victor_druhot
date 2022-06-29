module.exports = (sequelize, Sequelize) => {
  const Gift = sequelize.define("gift", {
    player: {
      type: Sequelize.STRING,
    },
    item: {
      type: Sequelize.STRING,
    },
  });
  return Gift;
};
