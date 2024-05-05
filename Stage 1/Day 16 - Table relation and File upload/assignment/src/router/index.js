import projectRouter from "./projectRouter.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import { TestimonialController } from "../controllers/testimonialControllers.js";
import { ContactController, HomeController } from "../controllers/index.js";
import { GlobalErrorMiddleware } from "../middlewares/error.js";

export const router = (app) => {
  app.get("/", HomeController.use());

  app.get("/contact", ContactController.use());

  app.get("/testimonials", TestimonialController.use("index"));

  app.use("/projects", projectRouter);
  // app.use("/users", userRouter);
  app.use("/auth", authRouter);

  app.use(GlobalErrorMiddleware.handle);
};
