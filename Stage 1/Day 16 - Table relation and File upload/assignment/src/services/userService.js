import { Service } from "./index.js";
import db from "../database/models/index.js";
import { QueryTypes } from "sequelize";
import { ERROR_MESSAGE, NotFound } from "../lib/error.js";
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const { User } = db;

export class UserService extends Service {
  static #fullName = Sequelize.fn(
    "CONCAT",
    Sequelize.col("firstName"),
    " ",
    Sequelize.col("lastName")
  );

  static #options = (include) => ({
    attributes: {
      include: [[this.#fullName, "fullName"], ...(include ?? [])],
      exclude: ["password", "email", "role"],
    },
    order: [[this.#fullName, "ASC"]],
  });

  static #getIncludedColumns = (include) =>
    include.length > 0 ? "," + include.map((c) => `"${c}"`).join(",") : "";

  static #selectAllQuery = (include) => {
    const includedColumn = this.#getIncludedColumns(include);

    return `SELECT "id", "username", "first_name" as "firstName", "last_name" as "lastName",CONCAT("first_name", ' ', "last_name") AS "fullName","bio","picture" ${includedColumn},"created_at" as "createdAt", "updated_at" as "updatedAt" FROM "tb_users" ORDER BY "fullName" DESC`;
  };

  static #selectQuery = (include) => {
    const includedColumn = this.#getIncludedColumns(include);

    return `SELECT "id", "username", "first_name" as "firstName", "last_name" as "lastName",CONCAT("first_name", ' ', "last_name") AS "fullName","bio","picture" ${includedColumn},"created_at" as "createdAt", "updated_at" as "updatedAt" FROM "tb_users" WHERE id = :id`;
  };

  static #insertQuery = `INSERT INTO "tb_users" ("email", "password", "username", "first_name", "last_name",  "created_at", "updated_at", "id") VALUES (:email, :password, :username, :firstName, :lastName,  now(),now(), gen_random_uuid())`;

  static #updateQuery = `UPDATE "tb_users" SET "email"=:email, "password"=:password, "username"=:username, "first_name"=:firstName, "last_name"=:lastName, "bio"=:bio, "updated_at"=now(), "picture"=:picture WHERE id = :id`;

  static #deleteQuery = `DELETE FROM "tb_users" WHERE id = :id`;

  static async getAll(include = []) {
    const users = await sequelize.query(this.#selectAllQuery(include), {
      type: QueryTypes.SELECT,
    });

    // const users = await User.findAll({
    //   ...this.#options(include),
    // });

    console.log(users, "ALL DATA");

    return users;
  }

  static async get(id, include = [], throwWhenNotFound = true) {
    const [user] = await sequelize.query(this.#selectQuery(include), {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    // const user = await User.findByPk(id, {
    //   ...this.#options(include),
    // });

    if (!user && throwWhenNotFound)
      throw new NotFound(ERROR_MESSAGE.userNotFound);

    console.log(user, "DATA BY ID", id);

    return user;
  }

  static async create(newData) {
    const { firstName = null, lastName = null, ...rest } = newData;
    const createdUser = await sequelize.query(this.#insertQuery, {
      replacements: { firstName, lastName, ...rest },
      type: QueryTypes.INSERT,
    });

    // const createdUser = await User.create(
    //   {  ...rest },
    //   { ...this.#options }
    // );

    const user =
      typeof createdUser === User ? createdUser.toJSON() : createdUser;

    console.log(createdUser, "CREATED USER");

    return user;
  }

  static async update(data) {
    const { id, email, password, username, firstName, lastName, bio, picture } =
      data;

    const user = await this.get(id, ["password", "email"]);

    const updatedUser = await sequelize.query(this.#updateQuery, {
      replacements: {
        id,
        email: email || user.email,
        password: password || user.password,
        username: username || user.username,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
        picture: picture || user.picture,
      },
      type: QueryTypes.UPDATE,
    });

    // const updatedUser = await User.update(rest, {
    //   where: { id },
    //   ...this.#options,
    // });

    console.log(updatedUser, "UPDATED DATA");

    return updatedUser;
  }

  static async delete(id) {
    await this.get(id);

    const deletedUser = await sequelize.query(this.#deleteQuery, {
      replacements: { id },
      type: QueryTypes.DELETE,
    });

    // const deletedUser = await User.destroy({
    //   where: { id },
    //   ...this.#options,
    // });

    console.log(deletedUser, "DELETED DATA");

    return deletedUser;
  }
}
