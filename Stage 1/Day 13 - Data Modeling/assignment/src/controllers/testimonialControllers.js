import { Controller } from "./index.js";

export class TestimonialController extends Controller {
  static async index(req, res) {
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
  }
}
