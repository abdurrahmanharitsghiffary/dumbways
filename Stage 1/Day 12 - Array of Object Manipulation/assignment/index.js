import express from "express";
import { create } from "express-handlebars";
import { NAV_ITEMS } from "./lib/consts.js";
import { techIcons } from "./lib/icon.js";
import { router } from "./routes/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  convertToDateTimeLocalString,
  getDuration,
  getFormattedDuration,
  getTestimonialDuration as gTD,
} from "./lib/utils.js";
import methodOverride from "method-override";

const app = express();
export const p = (url) => join(dirname(fileURLToPath(import.meta.url)), url);

const hbs = create({
  extname: ".hbs",
  helpers: {
    getDatetimeLocal: (ctx) => convertToDateTimeLocalString(ctx),
    getRatingStar: (ctx) => {
      const ratingStar = [1, 2, 3, 4, 5]
        .map((val) => {
          const difference = Number(ctx) - val + 1;
          const isShowFullStar = difference >= 1;
          const isShowHalfStar = difference >= 0.5;

          if (isShowFullStar) return '<i class="fa-solid fa-star"></i>';
          if (isShowHalfStar)
            return '<i class="fa-solid fa-star-half-stroke"></i>';
          return '<i class="fa-regular fa-star"></i>';
        })
        .join("");

      return ratingStar;
    },
    getTestimonialDuration: (ctx) => {
      return gTD(ctx);
    },
    getCardIcons: (ctx) => {
      return techIcons[ctx].icon;
    },
    getProjectDuration: (ctx) => {
      return getFormattedDuration(getDuration(ctx.startDate, ctx.endDate));
    },
    toDateString: (ctx) => {
      const d = new Date(ctx);
      return d.toDateString();
    },
    getIcons: (ctx) => {
      return techIcons[ctx];
    },
    navItems: () => {
      return NAV_ITEMS.map(
        (item) => `<li class="nav-item">
        <a href="${item.src}" class="nav-link text-dark">${item.label}</a>
        </li>`
      ).join("");
    },
  },
});

app.use(express.static(p("./public")));
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", p("./views"));

router(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
