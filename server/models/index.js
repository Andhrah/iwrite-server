/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import dbConfig from '../config/database';
import { env } from '../helpers/utils';

const basename = path.basename(__filename);

const environment = env('NODE_ENV');
const config = dbConfig[environment];
const db = {};

let sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const onlyModels = file => (
  (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
);

fs
  .readdirSync(__dirname)
  .filter(onlyModels)
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
