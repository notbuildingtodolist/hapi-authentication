const { User } = require("../models");
const { responseHelper } = require("../helpers");

const getUserDetails = async (req, h) => {
  try {

    const userFound = await User.findOne({
      where: {
        id: req.user.id,
      },
      raw: true,
      attributes: {
        exclude: ['password', 'createdAt', 'deletedAt', 'updatedAt'],
      }
    });

    return responseHelper.success(h, "USERDETAILS200", { user: userFound });
    
  } catch (ex) {
    return responseHelper.error(h, "SERVER500", ex);
  }
}

module.exports = {
  getUserDetails,
};
