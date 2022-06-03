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
    stat1: {
      type: Sequelize.STRING,
    },
    stat2: {
      type: Sequelize.STRING,
    },
    stat3: {
      type: Sequelize.STRING,
    },
    stat4: {
      type: Sequelize.STRING,
    },
    stat5: {
      type: Sequelize.STRING,
    },
    stat6: {
      type: Sequelize.STRING,
    },
    stat7: {
      type: Sequelize.STRING,
    },
    stat8: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    slot: {
      type: Sequelize.STRING,
    },
  });
  return Perso;
};
