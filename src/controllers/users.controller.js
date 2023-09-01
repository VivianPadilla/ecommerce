import CurrentUserDTO from "../dao/dto/currentUser.dto.js";
import userManager from "../dao/dataBaseManager/userManager.js";
import logger from "../helper/logger/index.js";

const addUser = async (req, res) => {
  try {
    res.send({ status: "success", message: "Usuario registrado" });
  } catch (error) {
    logger.error("Error en user.controller addUser(): ", error);
    logger.debug("Error en user.controller addUser(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .send({ status: "error", error: "Credenciales incorrectas" });
  }

  req.session.user = {
    id: req.user._id,
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    age: req.user.age,
    rol: req.user.rol,
    cartId: req.user.cart,
  };

  res.send({
    status: "success",
    message: "Usuario registrado",
    payload: req.user,
  });
};

const getUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const currentUserId = req.session.passport.user;
      const getUserResponse = await userManager.getUser(currentUserId);
      const currentUserDTO = new CurrentUserDTO(getUserResponse);
      res.status(200).send(currentUserDTO);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    logger.error("Error en users.controller getUser(): ", error);
    logger.debug("Error en users.controller getUser(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const putUserByEmail = async (req, res) => {
  try {
    const emailUser = req.params.email;
    const newPassword = req.body;
    const putUserEmailResponse = await userManager.putOneUserByEmail(
      emailUser,
      newPassword
    );
    res.status(200).send({ status: "success", payload: putUserEmailResponse });
  } catch (error) {
    logger.error("Error en users.controller putUserByEmail(): ", error);
    logger.debug("Error en users.controller putUserByEmail(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const emailUser = req.params.email;
    const getUserEmailResponse = await userManager.getUserByEmail(emailUser);
    res.status(200).send({ status: "success", payload: getUserEmailResponse });
  } catch (error) {
    logger.error("Error en users.controller getUserByEmail(): ", error);
    logger.debug("Error en users.controller getUserByEmail(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const putUsersRol = async (req, res) => {
  try {
    const userId = req.params.uid;
    const putUsersRolResponse = await userManager.putUserRol(userId);
    res.status(200).send({ status: "success", payload: putUsersRolResponse });
  } catch (error) {
    logger.error("Error en users.controller putUsersRol(): ", error);
    logger.debug("Error en users.controller putUsersRol(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

// const githubCallback = async (req, res) => {
//   try {
//     req.session.user = {
//       name: `${req.user.firstName} ${req.user.lastName}`,
//       email: req.user.email,
//       age: req.user.age,
//       rol: req.user.rol,
//       totalPurchase: 0,
//     };

//     res.redirect("/products");
//   } catch (error) {
//     logger.error("Error en users.controller githubCallback(): ", error);
//     logger.debug("Error en users.controller githubCallback(): ", error);
//     return res.status(500).send({ status: "error", error: error.message });
//   }
// };

const postDocuments = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .send({ status: "error", error: "No se pudo guardar los documentos" });
    }

    const postDocumentResponse = await userManager.postDocumentsUser(
      req.session.user.id,
      req.files
    );

    res
      .status(200)
      .send({ status: "success", payload: postDocumentResponse.documents });
  } catch (error) {
    logger.error("Error en users.controller postDocuments(): ", error);
    logger.debug("Error en users.controller postDocuments(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const github = async (req, res) => { };

export default {
  addUser,
  loginUser,
  github,
  // githubCallback,
  getUser,
  putUserByEmail,
  getUserByEmail,
  putUsersRol,
  postDocuments,
};
