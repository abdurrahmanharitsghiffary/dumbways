const config = require("./config/config.json");
const { QueryTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.development);

(async () => {
  console.log(sequelize);

  const user = await sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  });

  console.log(user);
})();
