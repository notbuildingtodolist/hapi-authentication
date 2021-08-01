const { responseHelper, userHelper } = require("../helpers");
const { User } = require("../models");

/**
 * Auth middleware 
 * @param {*} server 
 * @param {*} options 
 * @param {*} next 
 * @returns 
 */
module.exports = (server, options, next) => {
  return {
    authenticate: async (req, h) => {

      try {

        const { authorization } = req.headers;
        const decodedToken = userHelper.verifyToken(authorization);

        const { id } = decodedToken;

        // Check user exists.
        const userFound = await User.findOne({
          where: {
            id,
          },
          attributes: ['id'],
          raw: true,
        });

        if (userFound) {
          req.user = userFound;
          return h.continue;
        } else {
          return responseHelper.error(h, "ACCESS403").takeover(); // forcefully redirect. 
        }

      } catch (ex) {
        return responseHelper.error(h, "SERVER500", ex).takeover(); // forcefully redirect. 
      }

    },
  }
};
