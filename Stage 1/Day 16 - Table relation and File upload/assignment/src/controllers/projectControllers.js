import { ProjectService } from "../services/projectService.js";
import { getDuration, getFormattedDuration } from "../lib/utils.js";
import { Controller } from "./index.js";
import { getUserId } from "../lib/getUserId.js";

export class ProjectController extends Controller {
  static async index(req, res) {
    const uId = getUserId(req);
    const projects = await ProjectService.getAll(uId);

    return res.render("projects", {
      meta: {
        title: "Projects",
        description: "Projects page",
        css: [{ href: "/css/project.css" }],
      },
      projects,
    });
  }

  static async add(req, res) {
    const [imagePath] = req.uploadedImages;
    let { title, description, image, startDate, endDate, technologies } =
      req.body;
    console.log(imagePath, "ImagePath");
    if (typeof technologies === "string") {
      technologies = [technologies];
    }

    await ProjectService.create({
      title,
      userId: req.session?.user?.id,
      description,
      image,
      startDate,
      endDate,
      technologies,
      image: imagePath,
    });

    return res.redirect("back");
  }

  static async create(req, res) {
    const uId = getUserId(req);
    const projects = await ProjectService.getAll(uId);

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
    const uId = getUserId(req);
    const project = await ProjectService.get(projectId, false, uId);
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
    const [projectImage] = req.uploadedImages;
    const { projectId } = req.params;
    let { title, description, image, startDate, endDate, technologies } =
      req.body;

    if (typeof technologies === "string") technologies = [technologies];
    console.log(projectImage, "Projects Image");
    console.log(image, "Image");
    await ProjectService.update({
      title,
      technologies,
      description,
      image: projectImage || image,
      startDate,
      endDate,
      technologies,
      id: projectId,
    });

    return res.redirect(`/projects/${projectId}`);
  }

  static async delete(req, res) {
    const { projectId } = req.params;

    await ProjectService.delete(projectId);

    return res.redirect("back");
  }

  static async edit(req, res) {
    const { projectId } = req.params;
    const uId = getUserId(req);
    const project = await ProjectService.get(projectId, false, uId);

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
