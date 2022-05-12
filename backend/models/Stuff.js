module.exports = (sequelize, Sequelize) => {
  const Stuff = sequelize.define("stuff", {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    pouvoir: {
      type: Sequelize.STRING,
    },
  });
  return Stuff;
};
