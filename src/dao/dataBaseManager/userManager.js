import { createhash, isValidPassword } from "../../utils.js";
import { userModel } from "../models/user.model.js";

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
    if (!userId) {
      throw new Error("Falta el id del usuario");
    }
    const userFound = await userModel
      .findById(userId)
      .populate("cart")
      .lean();
    if (userFound !== null) {
      return userFound;
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
    const userFounded = await userModel.findOne({ email: emailUser });
    if (userFounded === null) {
      throw new Error("El correo no existe");
    }

    const password = newPassword.password;

    if (isValidPassword(userFounded, newPassword.password)) {
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
    const userFounded = await userModel.findOne({ email: emailUser });
    if (userFounded === null) {
      throw new Error("El correo no existe");
    }
  } catch (error) {
    logger.error("Error en userManager getUserByEmail(): ", error);
    logger.debug("Error en userManager getUserByEmail(): ", error);
    throw new Error(error);
  }
}

const putUserRole = async (userId) => {
  try {
    const userFound = await userModel.findById(userId);
    if (userFound === null) {
      throw new Error("El usuario no existe");
    }
    const userRole = userFound.role;
    let newRole = "";
    let userRoleUpdated = "";

    if (
      userRole.toUpperCase() !== "USER" &&
      userRole.toUpperCase() !== "USER_PREMIUM"
    ) {
      throw new Error(
        "El rol del usuario proporcionado no puede ser cambiado (solo: User y User_premium)"
      );
    }

    if (userRole.toUpperCase() === "USER" && userFound.statusDocuments) {
      newRole = "User_premium";

      userRoleUpdated = await userModel.updateOne(
        { _id: userId },
        { role: newRole }
      );
    } else if (userRole.toUpperCase() === "USER_PREMIUM") {
      newRole = "User";

      userRoleUpdated = await userModel.updateOne(
        { _id: userId },
        {
          role: newRole,
          statusDocuments: false,
          documents: [],
        }
      );
    } else {
      throw new Error("Todos los documentos solicitados no fueron cargados");
    }

    if (userRoleUpdated.n !== 0) {
      return userRoleUpdated;
    } else {
      throw new Error("Ocurrio un problema al actualizar el rol");
    }
  } catch (error) {
    logger.error("Error en userManager putUserRole(): ", error);
    logger.debug("Error en userManager putUserRole(): ", error);
    throw new Error(error);
  }
}

const postDocumentsUser = async (
  userId,
  {
    fileProfilePicture,
    fileProductPicture,
    fileIdentification,
    fileAddress,
    fileStatementAccount,
  }
) => {
  try {
    const user = await userModel.findById(userId);

    if (user === null) {
      throw new Error("Ups! El usuario no existe");
    }

    if (fileProfilePicture) {
      const { filename, path } = fileProfilePicture[0];
      user.documents.push({ name: filename, reference: path });
    }

    if (fileProductPicture) {
      const { filename, path } = fileProductPicture[0];
      user.documents.push({ name: filename, reference: path });
    }

    if (fileIdentification) {
      const { filename, path } = fileIdentification[0];
      user.documents.push({ name: filename, reference: path });
    }

    if (fileAddress) {
      const { filename, path } = fileAddress[0];
      user.documents.push({ name: filename, reference: path });
    }

    if (fileStatementAccount) {
      const { filename, path } = fileStatementAccount[0];
      user.documents.push({ name: filename, reference: path });
    }

    user.statusDocuments =
      !!fileIdentification && !!fileAddress && !!fileStatementAccount;

    const userUpdated = await user.save();

    return userUpdated;
  } catch (error) {
    logger.error("Error en productManager postDocumentsUser(): ", error);
    logger.debug("Error en productManager postDocumentsUser(): ", error);
    throw new Error(error);
  }
}

export default {
  addUser,
  createSession,
  getUser,
  putUserByEmail,
  getUserByEmail,
  putUserRole,
  postDocumentsUser,
};
