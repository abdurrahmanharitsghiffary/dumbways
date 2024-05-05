import { UserService } from "../services/userService.js";
import { Controller } from "./index.js";

export class UserController extends Controller {
  static #typeToJSON = (res) =>
    res.setHeader("content-type", "application/json");

  static async index(req, res) {
    const users = await UserService.getAll();

    this.#typeToJSON(res);
    return res.status(200).json(users);
  }

  static async get(req, res) {
    const { userId } = req.params;
    const user = await UserService.get(userId);

    this.#typeToJSON(res);
    return res.json(user);
  }

  static async add(req, res) {
    const { username, email, firstName, lastName, password } = req.body;

    await UserService.create({
      username,
      email,
      firstName,
      lastName,
      password,
    });

    this.#typeToJSON(res);
    return res.status(201).json();
  }

  static async delete(req, res) {
    const { userId } = req.params;

    await UserService.delete(userId);

    this.#typeToJSON(res);
    return res.status(204).json();
  }

  static async update(req, res) {
    const { userId } = req.params;
    const { email, password, username, firstName, lastName, bio } = req.body;

    await UserService.update({
      id: userId,
      email,
      password,
      username,
      lastName,
      firstName,
      bio,
    });

    this.#typeToJSON(res);
    return res.status(204).json();
  }
}
