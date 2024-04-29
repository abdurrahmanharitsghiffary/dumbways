import express from "express";
import projects from "../data/sample.json" assert { type: "json" };
import { getDuration, getFormattedDuration } from "../lib/utils.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
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

  console.log({
    title,
    description,
    projectThumbnail,
    startDate,
    endDate,
    technologies,
  });

  projects.unshift({
    title,
    description,
    projectThumbnail,
    startDate,
    endDate,
    technologies,
  });

  return res.redirect("back");
});

router.route("/add").get(async (req, res) => {
  return res.render("addProject", {
    meta: { title: "Add Project", css: [{ href: "/css/project.css" }] },
    script: [
      { src: "/script/utils/index.js" },
      { src: "/script/addProjectForm.js" },
    ],
    projects,
  });
});

router.route("/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const project = projects.find((project) => project.id === Number(projectId));
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
});

export default router;
