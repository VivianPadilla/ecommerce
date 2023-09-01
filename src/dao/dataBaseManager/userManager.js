import { createhash, isValidPassword } from "../../utils.js";
import { userModel } from "../models/user.model.js";
import logger from "../../helper/logger/index.js";

const addUser = async (user) => {
  try {
    const userAdded = await userModel.create(user);
    return ["Usuario agregado correctamente", userAdded];
  } catch (error) {
    logger.error("Error en userManager addUser(): ", error);
    logger.debug("Error en userManager addUser(): ", error);
    throw new Error(error);
  }
}

const createSession = async (user) => {
  try {
    const { email, password } = user;
    if (!email || !password) {
      throw new Error("Faltan campos a ingresar");
    }
    const userLoginValidate = await userModel.findOne(
      { email: email },
      { email: 1, firstName: 1, lastName: 1, age: 1, password: 1 }
    );
    if (!userLoginValidate) {
      throw new Error("Usuario no encontrado");
    }
    if (isValidPassword(userLoginValidate, password)) {
      throw new Error("Contraseña incorrecta");
    }
    delete userLoginValidate.password;
    return userLoginValidate;
  } catch (error) {
    logger.error("Error en userManager createSession(): ", error);
    logger.debug("Error en userManager createSession(): ", error);
    throw new Error(error);
  }
}

const getUser = async (userId) => {
  try {
    const user = await userModel
      .findById(userId)
      .populate("cart")
      .lean();
    if (user !== null) {
      return user;
    } else {
      throw new Error("No se encontro el usuario");
    }
  } catch (error) {
    logger.error("Error en userManager getUser(): ", error);
    logger.debug("Error en userManager getUser(): ", error);
    throw new Error(error);
  }
}

const putUserByEmail = async (emailUser, newPassword) => {
  try {
    const user = await userModel.findOne({ email: emailUser });
    if (user === null) {
      throw new Error("El correo no existe");
    }

    const password = newPassword.password;

    if (isValidPassword(user, newPassword.password)) {
      throw new Error("No se puede establecer la misma contraseña anterior");
    }

    const emailUpdated = await userModel.updateOne(
      { email: emailUser },
      { password: createhash(password) }
    );

    if (emailUpdated.n !== 0) {
      return emailUpdated;
    } else {
      throw new Error("Ocurrio un problema al actualizar la contraseña");
    }
  } catch (error) {
    logger.error("Error en userManager putUserByEmail(): ", error);
    logger.debug("Error en userManager putUserByEmail(): ", error);
    throw new Error(error);
  }
}

const getUserByEmail = async (emailUser) => {
  try {
    const user = await userModel.findOne({ email: emailUser });
    if (user === null) {
      throw new Error("El correo no existe");
    }
  } catch (error) {
    logger.error("Error en userManager getUserByEmail(): ", error);
    logger.debug("Error en userManager getUserByEmail(): ", error);
    throw new Error(error);
  }
}

const putUserRol = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const userRol = user.rol;
    let newRol = "";
    let userRolUpdated = "";
    if (userRol === "user" && user.statusDocuments) {
      newRol = "User_premium";
      userRolUpdated = await userModel.updateOne(
        { _id: userId },
        { rol: newRol }
      );
    } else if (userRol.toUpperCase() === "USER_PREMIUM") {
      newRol = "user";

      userRolUpdated = await userModel.updateOne(
        { _id: userId },
        {
          rol: newRol,
          statusDocuments: false,
          documents: [],
        }
      );
    } else {
      throw new Error("Faltan documentos");
    }

  } catch (error) {
    logger.error("Error en userManager putUserRol(): ", error);
    logger.debug("Error en userManager putUserRol(): ", error);
    throw new Error(error);
  }
}

const postDocumentsUser = async (
  userId,
  {
    profile_image,
    product_image,
    identification_document,
    address_document,
    statement_account_document,
  }
) => {
  try {
    const user = await userModel.findById(userId);
    if (user === null) {
      throw new Error("Ups! El usuario no existe");
    }
    if (profile_image) {
      const { filename, path } = profile_image[0];
      user.documents.push({ name: filename, reference: path });
    }
    if (product_image) {
      const { filename, path } = product_image[0];
      user.documents.push({ name: filename, reference: path });
    }
    if (identification_document) {
      const { filename, path } = identification_document[0];
      user.documents.push({ name: filename, reference: path });
    }
    if (address_document) {
      const { filename, path } = address_document[0];
      user.documents.push({ name: filename, reference: path });
    }
    if (statement_account_document) {
      const { filename, path } = statement_account_document[0];
      user.documents.push({ name: filename, reference: path });
    }
    user.statusDocuments =
      !!identification_document && !!address_document && !!statement_account_document;
    const userUpdated = await user.save();

    return userUpdated;
  } catch (error) {
    logger.error("Error en userManager postDocumentsUser(): ", error);
    logger.debug("Error en userManager postDocumentsUser(): ", error);
    throw new Error(error);
  }
}

export default {
  addUser,
  createSession,
  getUser,
  putUserByEmail,
  getUserByEmail,
  putUserRol,
  postDocumentsUser,
};
