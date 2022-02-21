module.exports = (sequelize, Sequelize) => {
  const Actu = sequelize.define("actu", {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    userName: {
      type: Sequelize.STRING,
    },
  });
  return Actu;
};
