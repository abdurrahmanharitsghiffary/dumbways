import express from "express";
import { ProjectController } from "../controllers/projectControllers.js";
import { Validate } from "../middlewares/validate.js";

const router = express.Router();
const validateUUID = Validate.isUUID("projectId");

router
  .route("/")
  .get(ProjectController.use("index"))
  .post(ProjectController.use("add"));

router.route("/add").get(ProjectController.use("create"));

router
  .route("/:projectId")
  .get(validateUUID, ProjectController.use("get"))
  .delete(validateUUID, ProjectController.use("delete"))
  .patch(validateUUID, ProjectController.use("update"));

router
  .route("/:projectId/edit")
  .get(validateUUID, ProjectController.use("edit"));

export default router;
