module.exports = (sequelize, Sequelize) => {
  const Stuff = sequelize.define("stuff", {
    code: {
      type: Sequelize.STRING,
    },
    arme: {
      type: Sequelize.STRING,
    },
  });
  return Stuff;
};
