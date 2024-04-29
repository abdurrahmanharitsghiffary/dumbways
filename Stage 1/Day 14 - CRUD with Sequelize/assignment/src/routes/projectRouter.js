import express from "express";
import { ProjectController } from "../controllers/projectControllers.js";

const router = express.Router();

router
  .route("/")
  .get(ProjectController.use("index"))
  .post(ProjectController.use("add"));

router.route("/add").get(ProjectController.use("create"));

router
  .route("/:projectId")
  .get(ProjectController.use("get"))
  .delete(ProjectController.use("delete"))
  .patch(ProjectController.use("update"));

router.route("/:projectId/edit").get(ProjectController.use("edit"));

export default router;
