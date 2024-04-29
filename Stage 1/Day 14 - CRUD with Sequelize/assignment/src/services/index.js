export class Service {
  static async transformJsArrayToPostgresArray(arr) {
    if (!(arr instanceof Array)) return "{}";
    return `{${arr.map((t) => `"${t}"`).join(",")}}`;
  }

  static async getCorrectId(id) {
    let cId = id;
    if (!isNaN(Number(id))) {
      cId = Number(id);
    }
    return cId;
  }

  //   static convertDateToTimestamp(date) {
  //     const d = new Date(date);
  //     return d.toISOString().split("T").join(" ");
  //   }
}
