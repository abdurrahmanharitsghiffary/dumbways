import validator from "validator";
import { Middlewares } from "./index.js";

export class Validate extends Middlewares {
  static isUUID(key, errorKey, fromParams = true) {
    return this.tryCatch(async (req, res, next) => {
      const isUUID = validator.isUUID(req[fromParams ? "params" : "body"][key]);
      if (!isUUID) return res.render("404", { key: errorKey });
      return next();
    });
  }
}
