const { sign, verify } = require("jsonwebtoken");
const {
  jwt: { secretKey, expiresInSec },
} = require("../config");

module.exports = {
  generateAccessToken: (id) => {
    try {
      const token = sign({ id }, secretKey, {
        expiresIn: expiresInSec,
      });
      return token;
    } catch (err) {
      return null;
    }
  },

  verifyAccessToken: (token) => {
    try {
      const decoded = verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },

  setCookie: (res, token) => {
    res.cookie("jwt", token, {
      httpOnly: true,
    });
  },

  clearCookie: (res) => {
    res.clearCookie("jwt", {
      httpOnly: true,
    });
  },
};
