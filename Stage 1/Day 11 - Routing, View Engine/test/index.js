const express = require("express");
const { engine, create } = require("express-handlebars");
const path = require("path");
const app = express();
const p = (url) => path.join(__dirname, url);

const navItems = ["/", "/lol"];

const hbs = create({
  extname: ".hbs",
  helpers: {
    getNav: (ctx, options) => {
      return navItems.map((item) => `<li>${item}</li>`);
    },
  },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/homas", async (req, res) => {
  const superLongWait = async();

  for (let i in new Array(100000).fill(null)) {
    console.log(i);
  }

  res.render("famas");
});

app.listen(5000);
