const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User.js")(sequelize, Sequelize);
db.perso = require("./Perso.js")(sequelize, Sequelize);
db.stuff = require("./Stuff.js")(sequelize, Sequelize);
db.gift = require("./Gift.js")(sequelize, Sequelize);

db.stuff.belongsToMany(db.perso, {
  through: "perso_stuff",
  as: "persos",
  foreignKey: "stuff_id",
});
db.perso.belongsToMany(db.stuff, {
  through: "perso_stuff",
  as: "stuffs",
  foreignKey: "perso_id",
});

module.exports = db;
