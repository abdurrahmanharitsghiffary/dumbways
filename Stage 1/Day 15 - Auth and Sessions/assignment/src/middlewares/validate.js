import { Controller } from "../controllers/index.js";
import validator from "validator";
import { Unauthorized } from "../lib/error.js";

export class Validate extends Controller {
  static isUUID(key, errorKey, fromParams = true) {
    return this.tryCatch(async (req, res, next) => {
      const isUUID = validator.isUUID(req[fromParams ? "params" : "body"][key]);
      if (!isUUID) return res.render("404", { key: errorKey });
      return next();
    });
  }

  static isLoggedIn() {
    return this.tryCatch(async (req, res, next) => {
      if (!req.session?.user?.isLoggedIn) throw new Unauthorized();
      return next();
    });
  }
}
