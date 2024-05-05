import express from "express";
import { AuthController } from "../controllers/authController.js";

const router = express.Router();

router
  .route("/login")
  .get(AuthController.use("loginForm"))
  .post(AuthController.use("login"));

router
  .route("/register")
  .get(AuthController.use("registerForm"))
  .post(AuthController.use("register"));

router.route("/logout").delete(AuthController.use("logout"));

export default router;
