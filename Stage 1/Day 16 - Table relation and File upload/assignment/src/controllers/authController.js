import { UserService } from "../services/userService.js";
import * as bcrypt from "bcrypt";
import { getEnv } from "../lib/env.js";
import { Controller } from "./index.js";
import db from "../database/models/index.js";
import { QueryTypes } from "sequelize";
import { flash } from "../lib/flash.js";
const { User } = db;
const sequelize = db.sequelize;

export class AuthController extends Controller {
  static async register(req, res) {
    const { password, username, email } = req.body;

    const [user] = await sequelize.query(
      `SELECT * FROM "tb_users" WHERE email = :email OR username = :username`,
      { type: QueryTypes.SELECT, replacements: { email, username } }
    );
    // const user = await User.findOne({
    //   where: { [Op.or]: [{ email }, { username }] },
    // });

    if (user?.username === username)
      return flash({
        req,
        res,
        message: ["error", `Username ${username} already taken!`],
      });
    if (user)
      return flash({
        req,
        res,
        message: ["error", `Email ${email} already taken!`],
      });

    const hashedPassword = await bcrypt.hash(password, Number(getEnv("SALT")));

    await UserService.create({
      password: hashedPassword,
      username,
      email,
    });

    return flash({
      req,
      res,
      message: [
        "success",
        "Account successfully registered, please sign in to your account.",
      ],
      redirectTo: "/auth/login",
    });
  }

  static async login(req, res) {
    const { password, email } = req.body;

    const [user] = await sequelize.query(
      `SELECT * FROM "tb_users" WHERE email = :email`,
      {
        type: QueryTypes.SELECT,
        replacements: { email },
      }
    );
    // const user = await User.findOne({ where:{email} });

    const invalidCredentialsFlash = () =>
      flash({
        req,
        res,
        message: ["error", "Invalid Credentials."],
      });

    if (!user) return invalidCredentialsFlash();

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return invalidCredentialsFlash();

    req.session.user = {
      isLoggedIn: true,
      id: user.id,
      role: user.role,
      username: user.username,
      picture: user.picture,
    };

    return flash({
      req,
      res,
      message: ["success", `Hi ${user.username}, welcome to your account.`],
      redirectTo: "/",
    });
  }

  static async logout(req, res) {
    req.session.destroy();
    return res.redirect("/auth/login");
  }

  static async loginForm(req, res) {
    return res.render("loginForm", {
      meta: {
        title: "Login",
        description: "Login form",
      },
      script: [
        { src: "/script/utils/index.js" },
        { src: "/script/utils/auth.js" },
        { src: "/script/loginFormValidation.js" },
      ],
    });
  }

  static async registerForm(req, res) {
    return res.render("registerForm", {
      meta: { title: "Register", description: "Register form" },
      script: [
        { src: "/script/utils/index.js" },
        { src: "/script/utils/auth.js" },
        { src: "/script/registerFormValidation.js" },
      ],
    });
  }
}
