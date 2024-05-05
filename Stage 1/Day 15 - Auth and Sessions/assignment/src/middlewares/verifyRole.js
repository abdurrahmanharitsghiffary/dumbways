import { Controller } from "../controllers/index.js";
import { AccessDenied, Unauthorized } from "../lib/error.js";
import { UserService } from "../services/userService.js";

export class VerifyRole extends Controller {
  static async handle(req, res, next) {
    const isLoggedIn = req.session.isLoggedIn;
    const userId = req.session.userId;

    const user = await UserService.get(userId);

    if (!isLoggedIn) throw new Unauthorized();
    if (user.role === "user") throw new AccessDenied();
    return next();
  }
}
