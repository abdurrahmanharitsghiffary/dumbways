import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.development);

export default sequelize;
