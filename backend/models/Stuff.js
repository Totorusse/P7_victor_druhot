module.exports = (sequelize, Sequelize) => {
  const Stuff = sequelize.define("stuff", {
    arme: {
      type: Sequelize.STRING,
    },
  });
  return Stuff;
};
