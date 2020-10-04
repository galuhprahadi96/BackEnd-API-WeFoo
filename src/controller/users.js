const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/index.js");
const {
  postUser,
  checkUser,
  getAllUser,
  getUserById,
  patchUser,
  deleteUser,
} = require("../model/users");
const { JsonWebTokenError } = require("jsonwebtoken");

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_password } = request.body;
      if (user_name !== "" && user_email !== "" && user_password !== "") {
        if (user_email.search("@") > 0) {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (user_password.match(regex)) {
            const checkemail = await checkUser(user_email);
            if (checkemail.length > 0) {
              return helper.response(response, 400, "Email already registered");
            } else {
              const salt = bcrypt.genSaltSync(10);
              const encryptPassword = bcrypt.hashSync(user_password, salt);

              const setData = {
                user_name,
                user_email,
                user_password: encryptPassword,
                user_role: 2,
                user_status: 0,
                user_created_at: new Date(),
              };

              const result = await postUser(setData);

              return helper.response(response, 201, "Register success", result);
            }
          } else {
            return helper.response(
              response,
              400,
              "Password At least 8 characters, at least one letter and one number"
            );
          }
        } else {
          return helper.response(response, 400, "email not invalid");
        }
      } else {
        return helper.response(response, 400, "input value first");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      if (user_email !== "" && user_password !== "") {
        if (user_email.search("@") > 0) {
          const checkDataUser = await checkUser(user_email);

          if (checkDataUser.length >= 1) {
            if (checkDataUser[0].user_status == 1) {
              const checkPassword = bcrypt.compareSync(
                user_password,
                checkDataUser[0].user_password
              );

              if (checkPassword) {
                const {
                  user_id,
                  user_email,
                  user_name,
                  user_role,
                  user_status,
                } = checkDataUser[0];
                let payload = {
                  user_id,
                  user_email,
                  user_name,
                  user_role,
                  user_status,
                };
                const token = jwt.sign(payload, "RAHASIA", {
                  expiresIn: "24h",
                });
                payload = { ...payload, token };

                return helper.response(response, 200, "Success login", payload);
              } else {
                return helper.response(response, 400, "Wrong Password");
              }
            } else {
              return helper.response(
                response,
                400,
                "user not active please contact admin"
              );
            }
          } else {
            return helper.response(response, 400, "Email not Registered");
          }
        } else {
          return helper.response(response, 400, "email not invalid");
        }
      } else {
        return helper.response(response, 400, "input value first");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const result = await getAllUser();
      return helper.response(res, 200, "Success Get All user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getUserById(id);
      if (result.length > 0) {
        return helper.response(res, 200, "Success Get user Id", result);
      } else {
        return helper.response(res, 404, `user id = ${id} not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  patchUser: async (req, res) => {
    try {
      const id = req.params.id;

      const { user_name, user_email, user_role, user_status } = req.body;

      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        if (
          user_name !== "" &&
          user_email !== "" &&
          user_role !== "" &&
          user_status !== ""
        ) {
          const setData = {
            user_name,
            user_email,
            user_role,
            user_status,
            user_updated_at: new Date(),
          };
          const result = await patchUser(setData, id);
          return helper.response(res, 201, "User Updated", result);
        } else {
          return helper.response(res, 400, `values has insert`);
        }
      } else {
        return helper.response(res, 404, `User Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  changePassword: async (req, res) => {
    try {
      const id = req.params.id;

      const { user_password } = req.body;

      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        if (user_password !== "") {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (user_password.match(regex)) {
            const salt = bcrypt.genSaltSync(10);
            const encryptPassword = bcrypt.hashSync(user_password, salt);

            const setData = {
              user_password: encryptPassword,
              user_updated_at: new Date(),
            };

            const result = await patchUser(setData, id);
            return helper.response(res, 201, "Password change", result);
          } else {
            return helper.response(
              res,
              404,
              "Password At least 8 characters, at least one letter and one number"
            );
          }
        } else {
          return helper.response(res, 400, `values has insert`);
        }
      } else {
        return helper.response(res, 404, `User Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        const result = await deleteUser(id);
        return helper.response(res, 201, "User Deleted", result);
      } else {
        return helper.response(res, 404, `User id : ${id} not found`);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
