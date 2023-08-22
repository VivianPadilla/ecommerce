import tokenManager from "../dao/dataBaseManager/tokenManager.js";

const postNewToken = async (req, res) => {
  try {
    const token = await tokenManager.postOneToken();
    return res.status(200).send(token);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const getToken = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenExists = await tokenManager.getOneToken(token);
    return res.status(200).send({ status: "success", payload: tokenExists });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  postNewToken,
  getToken,
};
