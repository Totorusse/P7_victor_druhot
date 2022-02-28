module.exports = (sequelize, Sequelize) => {
  const Likenumber = sequelize.define("likenumber", {
    userName: {
      type: Sequelize.STRING,
    },
    actuId: {
      type: Sequelize.INTEGER,
    },
    value: {
      type: Sequelize.INTEGER,
    },
  });
  return Likenumber;
};
