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
db.actu = require("./Actu.js")(sequelize, Sequelize);
db.stuff = require("./Stuff.js")(sequelize, Sequelize);
db.perso = require("./Perso.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);
db.likenumber = require("./Like.js")(sequelize, Sequelize);
module.exports = db;
