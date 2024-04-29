import sequelize from "../config/db.js";
import { QueryTypes } from "sequelize";
import { Service } from "./index.js";
import { ERROR_MESSAGE, RequestError } from "../lib/error.js";

export class ProjectService extends Service {
  static async getAll() {
    const query = `SELECT id, name as title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects`;
    const data = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log(data, "DATA");
    return data;
  }

  static async create(newData) {
    const { technologies, startDate, endDate, ...rest } = newData;
    const query = `INSERT INTO tb_projects(name, start_date, end_date, description, technologies, image) values (:title , :startDate , :endDate , :description , :technologies , :image )`;

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

    return createdData;
  }

  static async get(id, throwWhenNotFound = true) {
    const cId = await this.getCorrectId(id);

    const query = `SELECT id, name as title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects WHERE id = :id`;

    const [project] = await sequelize.query(query, {
      replacements: { id: cId },
      type: QueryTypes.SELECT,
    });

    if (!project && throwWhenNotFound)
      throw new RequestError(ERROR_MESSAGE.projectNotFound, 404);

    return project;
  }

  static async delete(id) {
    const project = await this.get(id);

    const query = `DELETE FROM tb_projects WHERE id=:id`;

    const deletedData = await sequelize.query(query, {
      replacements: { id: project.id },
      type: QueryTypes.DELETE,
    });

    return deletedData;
  }

  static async update(data) {
    const { id, technologies, startDate, endDate, ...rest } = data;
    const project = await this.get(id);

    const postgresTechArray = await this.transformJsArrayToPostgresArray(
      technologies
    );

    const query = `UPDATE tb_projects SET name=:title,start_date=:startDate,end_date=:endDate,description=:description,technologies=:technologies,image=:image WHERE id=:id`;

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

    return updatedData;
  }
}

// const projectFilePath = "./src/data/projects.json";

// (async () => {
//   try {
//     const data = await fs.readFile(projectFilePath, { encoding: "utf-8" });
//     JSON.parse(data);
//   } catch (err) {
//     if (
//       err &&
//       (err.code === "ENOENT" ||
//         err.message.includes("Unexpected end of JSON input"))
//     ) {
//       await initFile();
//     }
//     console.error(err.message);
//     console.log("----------- ERRROR -----------");
//   }
// })();

// const initFile = async () => {
//   await fs.writeFile(projectFilePath, JSON.stringify([]), {
//     encoding: "utf-8",
//   });
// };
