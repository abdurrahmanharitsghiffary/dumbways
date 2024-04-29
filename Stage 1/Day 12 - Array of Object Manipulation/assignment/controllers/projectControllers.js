import { ProjectService } from "../services/projectService.js";
import { getDuration, getFormattedDuration } from "../lib/utils.js";
import { RequestError, ems } from "../lib/error.js";
import { Controller } from "./index.js";

export class ProjectController extends Controller {
  static async index(req, res) {
    const projects = await ProjectService.getAll();

    return res.render("projects", {
      meta: {
        title: "My Projects",
        description: "My projects page",
        css: [{ href: "/css/project.css" }],
      },
      projects,
    });
  }

  static async add(req, res) {
    let {
      title,
      description,
      projectThumbnail,
      startDate,
      endDate,
      technologies,
    } = req.body;

    if (typeof technologies === "string") {
      technologies = [technologies];
    }

    await ProjectService.create({
      title,
      description,
      projectThumbnail,
      startDate,
      endDate,
      technologies,
    });

    return res.redirect("back");
  }

  static async create(req, res) {
    const projects = await ProjectService.getAll();

    return res.render("addProject", {
      meta: { title: "Add Project", css: [{ href: "/css/project.css" }] },
      script: [
        { src: "/script/utils/index.js" },
        { src: "/script/projectFormValidation.js" },
      ],
      projects,
    });
  }

  static async get(req, res) {
    const { projectId } = req.params;

    const project = await ProjectService.get(projectId);
    if (!project) return res.render("404", { key: "Project" });

    const duration = getFormattedDuration(
      getDuration(project?.startDate, project?.endDate)
    );

    return res.render("projectDetail", {
      meta: {
        title: project?.title,
        description: project?.description,
        css: [{ href: "/css/projectDetail.css" }],
      },
      project: { ...project, duration },
    });
  }

  static async update(req, res) {
    const { projectId } = req.params;
    let {
      title,
      description,
      projectThumbnail,
      startDate,
      endDate,
      technologies,
    } = req.body;

    const project = await ProjectService.get(projectId);

    if (!project) throw new RequestError(ems.projectNotFound, 404);

    if (typeof technologies === "string") technologies = [technologies];

    await ProjectService.update({
      title,
      technologies,
      description,
      projectThumbnail,
      startDate,
      endDate,
      technologies,
      id: projectId,
    });

    return res.redirect("/projects");
  }

  static async delete(req, res) {
    const { projectId } = req.params;

    const project = await ProjectService.get(projectId);
    console.log(project, "PROJEK");
    if (!project) throw new RequestError(ems.projectNotFound, 404);

    await ProjectService.delete(projectId);

    return res.redirect("back");
  }

  static async edit(req, res) {
    const { projectId } = req.params;

    const project = await ProjectService.get(projectId);

    if (!project) return res.render("404", { key: "Project" });
    project.checkbox = {
      nodejs: false,
      nextjs: false,
      ts: false,
      react: false,
    };
    project.technologies.forEach((val) => {
      project.checkbox[val] = true;
    });

    console.log(project);
    return res.render("editProjectForm", {
      meta: {
        title: "Edit Project Form",
        description: "Page for editing project",
      },
      script: [
        { src: "/script/utils/index.js" },
        { src: "/script/projectFormValidation.js" },
      ],
      project,
    });
  }
}
