import { Forbidden } from "../lib/error.js";
import { ProjectService } from "../services/projectService.js";
import { Middlewares } from "./index.js";

export class VerifyOwnership extends Middlewares {
  static project(by) {
    return this.tryCatch(async (req, res, next) => {
      const projectId = req.params[by];

      const project = await ProjectService.get(projectId);
      console.log(project, "PROJECT");
      console.log(req.session, "SESSION");
      if (project.userId !== req.session.user.id)
        throw new Forbidden("Unable to modify another user's project.");

      return next();
    });
  }
}
