import express from "express";
import { changeHome, home } from "./controllers/homeController.js";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "hbs";
const { handlebars } = pkg;
fileURLToPath;
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
handlebars.registerPartial("nav", async () => {
  const nav = await fs.readFile(
    path.join(__dirname, "./views/partials/Navbar.hbs"),
    {
      encoding: "utf-8",
    }
  );

  return nav;
});
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "./views"));

app.get("/", home);
app.post("/", changeHome);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
