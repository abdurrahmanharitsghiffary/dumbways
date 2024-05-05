import { flash } from "../lib/flash.js";

export class GlobalErrorMiddleware {
  static async handle(err, req, res, next) {
    console.error(err);

    const statusCode = err?.statusCode ?? 400;
    const message = err?.message ?? "Something went wrong!";

    switch (err?.name) {
      case "Unauthorized": {
        return flash({
          req,
          res,
          message: [
            "danger",
            "You must login first to see the content of the page.",
          ],
          redirectTo: "/auth/login",
        });
      }
      default: {
        return res.status(statusCode).render("error", {
          statusCode,
          message,
        });
      }
    }
  }
}
