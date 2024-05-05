import express from "express";
import { ProjectController } from "../controllers/projectControllers.js";
import { Validate } from "../middlewares/validate.js";

const router = express.Router();
const validateUUID = Validate.isUUID("projectId", "Project");

router
  .route("/")
  .get(ProjectController.use("index"))
  .post(Validate.isLoggedIn(), ProjectController.use("add"));

router
  .route("/add")
  .get(Validate.isLoggedIn(), ProjectController.use("create"));

router
  .route("/:projectId")
  .get(validateUUID, ProjectController.use("get"))
  .delete(Validate.isLoggedIn(), validateUUID, ProjectController.use("delete"))
  .patch(Validate.isLoggedIn(), validateUUID, ProjectController.use("update"));

router
  .route("/:projectId/edit")
  .get(Validate.isLoggedIn(), validateUUID, ProjectController.use("edit"));

export default router;
