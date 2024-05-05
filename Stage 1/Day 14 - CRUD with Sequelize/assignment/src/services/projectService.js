import { QueryTypes } from "sequelize";
import { Service } from "./index.js";
import { ERROR_MESSAGE, RequestError } from "../lib/error.js";
import db from "../database/models/index.js";
const { Project } = db;
const sequelize = db.sequelize;

export class ProjectService extends Service {
  static async getAll() {
    const query = `SELECT id, title, "startDate", "endDate", description, technologies, image,"createdAt", "updatedAt" FROM tb_projects ORDER BY "createdAt" DESC`;
    const data = await sequelize.query(query, { type: QueryTypes.SELECT });

    // const data = await Project.findAll({
    //   order: [["createdAt", "DESC"]],
    // });
    // console.log(data, "DATA FROM GETALL");

    return data;
  }

  static async get(id, throwWhenNotFound = true) {
    const cId = await this.getCorrectId(id);

    const query = `SELECT id, title, "startDate", "endDate", description, technologies, image,"createdAt", "updatedAt" FROM tb_projects WHERE id = :id`;

    const [project] = await sequelize.query(query, {
      replacements: { id: cId },
      type: QueryTypes.SELECT,
    });

    // const project = await Project.findByPk(cId);

    if (!project && throwWhenNotFound)
      throw new RequestError(ERROR_MESSAGE.projectNotFound, 404);

    console.log(project, "DATA WITH ID ", id);

    return project;
  }

  static async create(newData) {
    const { technologies, startDate, endDate, ...rest } = newData;
    const query = `INSERT INTO tb_projects(id, title, "startDate", "endDate", description, technologies, image, "createdAt", "updatedAt") values (gen_random_uuid(),:title , :startDate , :endDate , :description , :technologies , :image, now(), now() )`;

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const createdData = await sequelize.query(query, {
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

    const query = `DELETE FROM tb_projects WHERE id=:id`;

    const deletedData = await sequelize.query(query, {
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
    const { id, technologies, startDate, endDate, ...rest } = data;
    const project = await this.get(id);

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const query = `UPDATE tb_projects SET title=:title,"startDate"=:startDate,"endDate"=:endDate,description=:description,technologies=:technologies,image=:image, "updatedAt"=now() WHERE id=:id`;

    const updatedData = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: {
        id: project.id,
        technologies: postgresTechArray,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        ...rest,
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
