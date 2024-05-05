import express from "express";
import { ProjectController } from "../controllers/projectControllers.js";
import { Validate } from "../middlewares/validate.js";
import { GetUploadedFilePath, uploadImage } from "../middlewares/multer.js";
import { VerifyOwnership } from "../middlewares/verifyOwnership.js";
import { VerifyIsLoggedIn } from "../middlewares/verifyIsLoggedIn.js";

const router = express.Router();
const validateUUID = Validate.isUUID("projectId", "Project");
const verifyProjectOwnership = VerifyOwnership.project("projectId");
const verifyIsLoggedIn = VerifyIsLoggedIn.use();

router
  .route("/")
  .get(ProjectController.use("index"))
  .post(
    verifyIsLoggedIn,
    uploadImage.single("image"),
    GetUploadedFilePath.use(),
    ProjectController.use("add")
  );

router.route("/add").get(verifyIsLoggedIn, ProjectController.use("create"));

router
  .route("/:projectId")
  .get(validateUUID, ProjectController.use("get"))
  .delete(
    verifyIsLoggedIn,
    verifyProjectOwnership,
    validateUUID,
    ProjectController.use("delete")
  )
  .patch(
    verifyIsLoggedIn,
    verifyProjectOwnership,
    uploadImage.single("image"),
    GetUploadedFilePath.use(),
    validateUUID,
    ProjectController.use("update")
  );

router
  .route("/:projectId/edit")
  .get(
    verifyIsLoggedIn,
    verifyProjectOwnership,
    validateUUID,
    ProjectController.use("edit")
  );

export default router;
