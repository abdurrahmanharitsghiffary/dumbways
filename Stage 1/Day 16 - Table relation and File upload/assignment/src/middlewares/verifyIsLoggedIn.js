import { Controller } from "../controllers/index.js";
import { Unauthorized } from "../lib/error.js";

export class VerifyIsLoggedIn extends Controller {
  static async handle(req, res, next) {
    if (!req.session?.user?.isLoggedIn) throw new Unauthorized();
    return next();
  }
}
