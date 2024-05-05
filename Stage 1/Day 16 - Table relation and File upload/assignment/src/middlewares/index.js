import { Controller } from "../controllers/index.js";

export class Middlewares extends Controller {
  static use() {
    throw new Error("Cannot call method use with class", this.name);
  }
}

// export class Middleware extends Controller {
//   static use([fn = "handle", arg = null]) {
//     return this.tryCatch(this[fn](arg));
//   }
// }
