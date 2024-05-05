export class GlobalErrorMiddleware {
  static async handle(err, req, res, next) {
    console.error(err);
    return res.status(err?.statusCode ?? 400).render("error", {
      statusCode: err?.statusCode ?? 400,
      message: err?.message ?? "Something went wrong!",
    });
  }
}
