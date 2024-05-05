import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import express from "express";
import { create } from "express-handlebars";
import { NAV_ITEMS } from "./src/lib/consts.js";
import { techIcons } from "./src/lib/icon.js";
import { router } from "./src/router/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  convertToDateTimeLocalString,
  getDuration,
  getFormattedDuration,
  getTestimonialDuration as gTD,
} from "./src/lib/utils.js";
import methodOverride from "method-override";
import session from "express-session";
import flash from "express-flash";
import { getEnv } from "./src/lib/env.js";

export const p = (url) => join(dirname(fileURLToPath(import.meta.url)), url);

const app = express();

const sessionOpts = {
  resave: true,
  saveUninitialized: true,
  secret: getEnv("SESSION_SECRET"),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
    // signed: true,
  },
};

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

app.use(session(sessionOpts));
app.use(flash());

const hbs = create({
  extname: ".hbs",
  partialsDir: p("./src/views/partials"),
  layoutsDir: p("./src/views/layouts"),
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

app.use(express.static(p("./src/public")));
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", p("./src/views"));

app.use(async (req, res, next) => {
  res.locals.user = req.session.user;
  console.log(req.session.user, "USER");
  return next();
});

router(app);

export default app;
