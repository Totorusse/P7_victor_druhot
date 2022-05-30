module.exports = (sequelize, Sequelize) => {
  const Perso = sequelize.define("perso", {
    code: {
      type: Sequelize.STRING,
    },
    nom: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    element: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  return Perso;
};
