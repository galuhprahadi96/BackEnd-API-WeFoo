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
  // register
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_password } = request.body;

      // Minimal delapan karakter, setidaknya ada satu huruf dan satu angka
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (user_password.match(regex)) {
        // cek email sudah ada apa belum
        const checkemail = await checkUser(user_email);
        if (checkemail.length > 0) {
          return helper.response(response, 400, "Email already registered");
        } else {
          // enkripsi password
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(user_password, salt);
          // ------ //
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
        // password invalid
        return helper.response(
          response,
          400,
          "Password At least 8 characters, at least one letter and one number"
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  // login
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      const checkDataUser = await checkUser(user_email);
      // cekdata
      if (checkDataUser.length >= 1) {
        // cek status
        if (checkDataUser[0].user_status == 1) {
          //cek pass
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          );
          //jika benar
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
            const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
            payload = { ...payload, token };

            return helper.response(response, 200, "Success login", payload);
          } else {
            return helper.response(response, 400, "Wrong Password");
          }
        } else {
          return helper.response(response, 400, "user not Active");
        }
      } else {
        return helper.response(response, 400, "Email not Registered");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  // manag user

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

      const { user_name, user_email, user_password, user_status } = req.body;

      const checkId = await getUserById(id);

      if (checkId.length > 0) {
        // error handling
        if (
          user_name !== undefined &&
          user_email !== undefined &&
          user_password !== undefined &&
          user_status !== undefined
        ) {
          // Minimal delapan karakter, setidaknya ada satu huruf dan satu angka
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (user_password.match(regex)) {
            // enkripsi password
            const salt = bcrypt.genSaltSync(10);
            const encryptPassword = bcrypt.hashSync(user_password, salt);
            // ------ //
            const setData = {
              user_name,
              user_email,
              user_password: encryptPassword,
              user_status,
              user_created_at: new Date(),
            };

            const result = await patchUser(setData, id);
            return helper.response(res, 201, "User Updated", result);
          } else {
            // password invalid
            return helper.response(
              res,
              400,
              "Password At least 8 characters, at least one letter and one number"
            );
          }
        } else {
          return helper.response(res, 201, `values has insert`);
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
