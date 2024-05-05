import { QueryTypes } from "sequelize";
import { Service } from "./index.js";
import { ERROR_MESSAGE, NotFound } from "../lib/error.js";
import db from "../database/models/index.js";
const { Project } = db;
const sequelize = db.sequelize;

export class ProjectService extends Service {
  static #selectAllQuery = `SELECT tp.id, tp.title, tu.username as author, tu.picture as "authorPicture", tu.id as "userId",tp.start_date as "startDate", tp.end_date as "endDate", tp.description, tp.technologies, tp.image, tp.created_at as "createdAt", tp.updated_at as "updatedAt" FROM tb_projects as tp JOIN tb_users as tu ON (tu.id = tp.user_id) ORDER BY "createdAt" DESC`;

  static #selectAllMeQuery = `SELECT tp.id, tp.title, tu.username as author, tu.picture as "authorPicture", tu.id as "userId",tp.start_date as "startDate", tp.end_date as "endDate", tp.description, tp.technologies, tp.image, tp.created_at as "createdAt", tp.updated_at as "updatedAt" FROM tb_projects as tp JOIN tb_users as tu ON (tu.id = tp.user_id AND tp.user_id = :userId) ORDER BY "createdAt" DESC`;

  static #selectQuery = `SELECT tp.id, tp.title, tu.username as author, tu.picture as "authorPicture",tp.start_date as "startDate", tu.id as "userId",tp.end_date as "endDate", tp.description, tp.technologies, tp.image, tp.created_at as "createdAt", tp.updated_at as "updatedAt" FROM tb_projects as tp JOIN tb_users as tu ON (tu.id = tp.user_id) WHERE tp.id = :id`;

  static #insertQuery = `INSERT INTO tb_projects(id, title, start_date, end_date, description, technologies, image, created_at, updated_at, user_id) values (gen_random_uuid(),:title , :startDate , :endDate , :description , :technologies , :image, now(), now(),:userId)`;

  static #updateQuery = `UPDATE tb_projects SET title=:title,start_date=:startDate,end_date=:endDate,description=:description,technologies=:technologies,image=:image, updated_at=now() WHERE id=:id`;

  static #deleteQuery = `DELETE FROM tb_projects WHERE id=:id`;

  static #userId = "";

  static setUserId(req) {
    this.#userId = req.session?.user?.id || "";
  }

  static async getAll() {
    const userId = this.#userId || null;
    const data = await sequelize.query(
      userId ? this.#selectAllMeQuery : this.#selectAllQuery,
      {
        type: QueryTypes.SELECT,
        replacements: { userId },
      }
    );

    return data.map((d) => ({ ...d, isOwned: d.userId === userId }));

    // const data = await Project.findAll({
    //   order: [["createdAt", "DESC"]],
    // });
    // console.log(data, "DATA FROM GETALL");
  }

  static async get(id, throwWhenNotFound = true) {
    const cId = await this.getCorrectId(id);

    const [project] = await sequelize.query(this.#selectQuery, {
      replacements: { id: cId },
      type: QueryTypes.SELECT,
    });

    if (!project && throwWhenNotFound)
      throw new NotFound(ERROR_MESSAGE.projectNotFound);

    console.log(project, "DATA WITH ID ", id);

    return { ...project, isOwned: project.userId === this.#userId };

    // const project = await Project.findByPk(cId);
  }

  static async create(newData) {
    const { technologies, userId, startDate, endDate, ...rest } = newData;

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const createdData = await sequelize.query(this.#insertQuery, {
      replacements: {
        ...rest,
        technologies: postgresTechArray,
        userId: this.#userId,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      },
      type: QueryTypes.INSERT,
    });

    const data =
      createdData instanceof Project ? createdData.toJSON() : createdData;

    console.log(data, "INSERTED DATA");

    return data;

    // const createdData = await Project.create(
    //   {
    //     ...rest,
    //     technologies,
    //     startDate: new Date(startDate).toISOString(),
    //     endDate: new Date(endDate).toISOString(),
    //   },
    //   { raw: true }
    // );
  }

  static async delete(id) {
    const project = await this.get(id);

    const deletedData = await sequelize.query(this.#deleteQuery, {
      replacements: { id: project.id },
      type: QueryTypes.DELETE,
    });

    console.log(deletedData, "DELETED DATA");

    return deletedData;

    // const deletedData = await Project.destroy({
    //   where: { id: project.id },
    // });
  }

  static async update(data) {
    const { id, technologies, startDate, endDate, description, title, image } =
      data;
    const project = await this.get(id);

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const updatedData = await sequelize.query(this.#updateQuery, {
      type: QueryTypes.UPDATE,
      replacements: {
        id: project.id,
        title: title || project.title,
        technologies:
          postgresTechArray ||
          (await this.transformJsArrayToPostgresArray(project.technologies)),
        startDate: new Date(startDate).toISOString() || project.startDate,
        endDate: new Date(endDate).toISOString() || project.endDate,
        description: description || project.description,
        image: image || project.image,
      },
    });

    console.log(updatedData, "UPDATED DATA");

    return updatedData;

    // const updatedData = await Project.update(
    //   {
    //     technologies,
    //     startDate: new Date(startDate).toISOString(),
    //     endDate: new Date(endDate).toISOString(),
    //     ...rest,
    //   },
    //   { where: { id: project.id }, raw: true }
    // );
  }
}
