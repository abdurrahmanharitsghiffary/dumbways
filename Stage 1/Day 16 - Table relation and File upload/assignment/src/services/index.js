export class Service {
  static async transformJsArrayToPostgresArray(arr) {
    return new Promise((resolve) => {
      if (!(arr instanceof Array)) return resolve(null);
      return resolve(`{${arr.map((t) => `"${t}"`).join(",")}}`);
    });
  }

  static async getCorrectId(id) {
    let cId = id;
    if (!isNaN(Number(id))) {
      cId = Number(id);
    }
    return cId;
  }

  static async getAll() {}
  static async get(id, throwWhenNotFound = true) {}
  static async update(data) {}
  static async create(newData) {}
  static async delete(id) {}
}
