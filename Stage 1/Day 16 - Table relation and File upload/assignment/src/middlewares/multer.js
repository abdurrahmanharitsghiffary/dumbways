import multer from "multer";
import { p } from "../../app.js";
import path from "path";
import fs from "fs/promises";
import { Controller } from "../controllers/index.js";

const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const path = `./public/uploads/images`;

    try {
      await fs.access(path);
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.mkdir(path);
      }
      console.error(err, "\nERROR FROM MULTER DESTINATION");
    }

    return cb(null, path);
  },
  filename: (req, file, cb) => {
    console.log(file, "FILE");
    const uniqueId = Date.now() + "-" + Math.round(Math.random() * 10000);
    return cb(
      null,
      `${uniqueId}-${path.parse(file.originalname).name}${path.extname(
        file.originalname
      )}`
    );
  },
});

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (
      [".png", ".jpg", ".webp", ".jpeg"].includes(
        path.extname(file.originalname)
      )
    ) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

export class GetUploadedFilePath extends Controller {
  static async handle(req, res, next) {
    const files = [...(req?.files ?? [])];
    if (req?.file) files.push(req.file);
    console.log(files, "FILES");

    req.uploadedImages = files.map((file) =>
      path.join("/", path.relative(p("/public"), file?.path))
    );

    return next();
  }
}
