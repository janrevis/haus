const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${process.cwd()}/config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Comment = require('./comment')(sequelize);
const User = require('./user')(sequelize);

sequelize.models.User.hasMany(sequelize.models.Comment)
sequelize.models.Comment.belongsTo(sequelize.models.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
