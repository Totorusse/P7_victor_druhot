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
    image: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.INTEGER,
    },
  });
  return Actu;
};
