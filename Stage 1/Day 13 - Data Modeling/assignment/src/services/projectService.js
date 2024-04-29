import fs from "fs/promises";
import sequelize from "../config/db.js";
import { QueryTypes } from "sequelize";

const projectFilePath = "./src/data/projects.json";

(async () => {
  try {
    const data = await fs.readFile(projectFilePath, { encoding: "utf-8" });
    JSON.parse(data);
  } catch (err) {
    if (
      err &&
      (err.code === "ENOENT" ||
        err.message.includes("Unexpected end of JSON input"))
    ) {
      await initFile();
    }
    console.error(err.message);
    console.log("----------- ERRROR -----------");
  }
})();

const initFile = async () => {
  await fs.writeFile(projectFilePath, JSON.stringify([]), {
    encoding: "utf-8",
  });
};

export class ProjectService {
  static async getAll() {
    const response = await fs.readFile(projectFilePath, { encoding: "utf-8" });
    const parsedJson = JSON.parse(response);
    return parsedJson;
  }

  static async create(newData) {
    const data = await this.getAll();

    if (data) {
      data.unshift({ ...newData, id: crypto.randomUUID() });
      await this.#saveFile(data);
    }
  }

  static async get(id) {
    const data = await this.getAll();
    return data.find((d) => d.id === id);
  }

  static async delete(id) {
    let data = await this.getAll();

    data = data.filter((d) => d.id !== id);

    await this.#saveFile(data);
  }

  static async update(updatedData) {
    let data = await this.getAll();

    data = data.map((d) => {
      if (d.id === updatedData.id) {
        return { ...d, ...updatedData };
      }
      return d;
    });

    await this.#saveFile(data);
  }

  static async #saveFile(data) {
    await fs.writeFile(projectFilePath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  }

  static async getWithRawQuery(id) {
    const query = `SELECT id, name as title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects`;

    if (id) {
      return await sequelize.query(
        `SELECT id, name as title, start_date as "startDate", end_date as "endDate", description, technologies, image, created_at as "createdAt", updated_at as "updatedAt" FROM tb_projects WHERE id = :id`,
        { replacements: { id }, type: QueryTypes.SELECT }
      );
    }

    const data = await sequelize.query(query, { type: QueryTypes.SELECT });

    return data;
  }
}
