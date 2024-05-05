import { Controller } from "../controllers/index.js";
import validator from "validator";

export class Validate extends Controller {
  static isUUID(key, fromParams = true) {
    return this.tryCatch(async (req, res, next) => {
      const isUUID = validator.isUUID(req[fromParams ? "params" : "body"][key]);
      if (!isUUID) return res.render("404", { key: "Project" });
      return next();
    });
  }
}
