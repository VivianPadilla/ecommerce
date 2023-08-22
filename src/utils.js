import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createhash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const getMockProduct = () => {
  const randomNumber = faker.number.int({ min: 2000, max: 9999 });
  const uniqueCode = parseInt(`${randomNumber}${Date.now()}`, 10);

  return {
    code: uniqueCode,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int(10),
    category: faker.commerce.department(),
    status: true,
    owner: 'admin',
    images: [],
  };
};

function determinarCarpetaDeDestino(req, file, cb) {
  let carpetaDestino = `${__dirname}/uploads`;

  if (file.fieldname === "file-profile-picture") {
    carpetaDestino += "/profiles";
  } else if (file.fieldname === "file-product-picture") {
    carpetaDestino += "/products";
  } else if (
    file.fieldname === "file-identification" ||
    file.fieldname === "file-address" ||
    file.fieldname === "file-statement-account"
  ) {
    carpetaDestino += "/documents";
  } else {
    return cb(new Error("Ups, El tipo de archivo no es válido"));
  }

  cb(null, carpetaDestino);
}

const storage = multer.diskStorage({
  destination: determinarCarpetaDeDestino,
  filename: function (req, file, cb) {
    const newNameFile = `${req.session.user.id}-${file.originalname}`;
    cb(null, newNameFile);
  },
});

export const uploader = multer({ storage });
export default __dirname;
