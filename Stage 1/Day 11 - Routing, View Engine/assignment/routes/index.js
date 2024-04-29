import projectRouter from "./projectRouter.js";
import projects from "../data/sample.json" assert { type: "json" };

export const router = (app) => {
  app.get("/", (req, res) => {
    return res.render("home", {
      meta: {
        title: "Home",
        description: "Home page",
        css: [{ href: "/css/home.css" }, { href: "/css/project.css" }],
      },
      projects,
    });
  });

  app.get("/contact", async (req, res) => {
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
  });

  app.get("/testimonials", async (req, res) => {
    const { rating = "all" } = req.query;
    const request = await fetch("https://api.npoint.io/0c93571f1bbb7357fa84");

    const testimonials = await request.json();

    const filteredTestimonials =
      rating === "all"
        ? testimonials
        : testimonials.filter(
            (testimonial) => Math.floor(testimonial.rating) === Number(rating)
          );

    console.log(filteredTestimonials);

    return res.render("testimonials", {
      meta: {
        title: "Testimonials",
        description: "Testimonial page",
        css: [{ href: "/css/testimonial.css" }],
      },
      testimonials: filteredTestimonials,
    });
  });

  app.use("/projects", projectRouter);
};
