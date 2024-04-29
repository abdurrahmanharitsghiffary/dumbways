const config = require("./config/config.json");
const { user: User } = require("./models");

(async () => {
  const projects = await User.findAll();
  // const user = await sequelize.query("SELECT * FROM users", {
  //   type: QueryTypes.SELECT,
  // });
  console.log(projects, "Projects");
})();
