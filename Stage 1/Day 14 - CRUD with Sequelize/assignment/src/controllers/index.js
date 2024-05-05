import { ProjectService } from "../services/projectService.js";

export class Controller {
  static tryCatch(controller) {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  static use(key = "handle") {
    return this.tryCatch(this[key]);
  }
}

export class HomeController extends Controller {
  static async handle(req, res) {
    const projects = await ProjectService.getAll();
    return res.render("home", {
      meta: {
        title: "Home",
        description: "Home page",
        css: [{ href: "/css/home.css" }, { href: "/css/project.css" }],
      },
      projects,
    });
  }
}

export class ContactController extends Controller {
  static async handle(req, res) {
    return res.render("contactForm", {
      meta: {
        title: "Contact Form",
        description: "Contact form page",
      },
      script: [
        { src: "/script/utils/index.js" },
        { src: "/script/contactForm.js" },
      ],
    });
  }
}
