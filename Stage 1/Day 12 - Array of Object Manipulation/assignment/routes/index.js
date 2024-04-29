import projectRouter from "./projectRouter.js";
import { TestimonialController } from "../controllers/testimonialControllers.js";
import { ContactController, HomeController } from "../controllers/index.js";
import { GlobalErrorMiddleware } from "../middlewares/error.js";

export const router = (app) => {
  app.get("/", HomeController.use("handle"));

  app.get("/contact", ContactController.use("handle"));

  app.get("/testimonials", TestimonialController.use("index"));

  app.use("/projects", projectRouter);

  app.use(GlobalErrorMiddleware.handle);
};
