import { QueryTypes } from "sequelize";
import { Service } from "./index.js";
import { ERROR_MESSAGE, NotFound } from "../lib/error.js";
import db from "../database/models/index.js";
const { Project } = db;
const sequelize = db.sequelize;

export class ProjectService extends Service {
  static #selectAllQuery = `SELECT id, title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects ORDER BY "createdAt" DESC`;

  static #selectQuery = `SELECT id, title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects WHERE id = :id`;

  static #insertQuery = `INSERT INTO tb_projects(id, title, start_date, end_date, description, technologies, image, created_at, updated_at) values (gen_random_uuid(),:title , :startDate , :endDate , :description , :technologies , :image, now(), now() )`;

  static #updateQuery = `UPDATE tb_projects SET title=:title,start_date=:startDate,end_date=:endDate,description=:description,technologies=:technologies,image=:image, updated_at=now() WHERE id=:id`;

  static #deleteQuery = `DELETE FROM tb_projects WHERE id=:id`;

  static async getAll() {
    const data = await sequelize.query(this.#selectAllQuery, {
      type: QueryTypes.SELECT,
    });

    // const data = await Project.findAll({
    //   order: [["createdAt", "DESC"]],
    // });
    // console.log(data, "DATA FROM GETALL");

    return data;
  }

  static async get(id, throwWhenNotFound = true) {
    const cId = await this.getCorrectId(id);

    const [project] = await sequelize.query(this.#selectQuery, {
      replacements: { id: cId },
      type: QueryTypes.SELECT,
    });

    // const project = await Project.findByPk(cId);

    if (!project && throwWhenNotFound)
      throw new NotFound(ERROR_MESSAGE.projectNotFound);

    console.log(project, "DATA WITH ID ", id);

    return project;
  }

  static async create(newData) {
    const { technologies, startDate, endDate, ...rest } = newData;

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const createdData = await sequelize.query(this.#insertQuery, {
      replacements: {
        ...rest,
        technologies: postgresTechArray,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      },
      type: QueryTypes.INSERT,
    });

    // const createdData = await Project.create(
    //   {
    //     ...rest,
    //     technologies,
    //     startDate: new Date(startDate).toISOString(),
    //     endDate: new Date(endDate).toISOString(),
    //   },
    //   { raw: true }
    // );

    const data =
      createdData instanceof Project ? createdData.toJSON() : createdData;

    console.log(data, "INSERTED DATA");

    return data;
  }

  static async delete(id) {
    const project = await this.get(id);

    const deletedData = await sequelize.query(this.#deleteQuery, {
      replacements: { id: project.id },
      type: QueryTypes.DELETE,
    });

    // const deletedData = await Project.destroy({
    //   where: { id: project.id },
    // });

    console.log(deletedData, "DELETED DATA");

    return deletedData;
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

    // const updatedData = await Project.update(
    //   {
    //     technologies,
    //     startDate: new Date(startDate).toISOString(),
    //     endDate: new Date(endDate).toISOString(),
    //     ...rest,
    //   },
    //   { where: { id: project.id }, raw: true }
    // );

    console.log(updatedData, "UPDATED DATA");

    return updatedData;
  }
}
