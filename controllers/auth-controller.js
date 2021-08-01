const { responseHelper, userHelper, mailHelper } = require("../helpers");
const { User, UserVerification } = require("../models");

const userLogin = async (req, h) => {
  try {

    const {
      email,
      password,
    } = req.payload;

    const userFound = await User.findOne({
      where: {
        email,
      },
      raw: true,
      attributes: ['id', 'password', 'is_verified'],
    });

    // Does user exists?
    if (!userFound) {
      return responseHelper.error(h, "USEREXISTS404");
    }

    // Is user verified?
    if (!userFound.is_verified) {
      return responseHelper.error(h, "USERNOTVERIFIED401");
    }

    // Check password
    if (!userHelper.comparePassword(password, userFound.password)) {
      return responseHelper.error(h, "PASSWORDMISMATCH400");
    }

    // All data valid. Now login
    const token = userHelper.generateToken({ id: userFound.id });
    return responseHelper.success(h, "USERLOGIN200", { token });

  } catch (ex) {
    return responseHelper.error(h, "SERVER500", ex);
  }
};

const userRegister = async (req, h) => {
  try {

    const {
      first_name,
      last_name,
      email,
      password,
    } = req.payload;

    const userFound = await User.findOne({
      where: {
        email,
      },
      raw: true,
      attributes: ['id'],
    });

    // User already exists.
    if (userFound) {
      return responseHelper.error(h, "USEREXISTS400");
    }

    // Hash password.
    const hashPassword = userHelper.hashPassword(password);

    const userCreated = await User.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
    });

    const otp = userHelper.generateOtp();

    // Create a record in user verifications.
    await UserVerification.create({
      otp,
      user_id: userCreated.id,
    });

    // Send the otp via mail to user.
    mailHelper(email, "User verification mail", `Your otp is ${otp}`);

    return responseHelper.success(h, "USERCREATED200");

  } catch (ex) {
    return responseHelper.error(h, "SERVER500", ex);
  }
};

const verifyUser = async (req, h) => {
  try {

    const { email, otp } = req.payload;

    // Check if the user verification exists.
    const verificationExists = await UserVerification.findOne({
      where: {
        otp,
      },
      attributes: ['id', 'is_revoked'],
      raw: true,
      mapToModel: true,
      nest: true,
      include: [
        {
          model: User,
          attributes: ['id', 'is_verified'],
          where: {
            email
          },
          required: true,
        }
      ]
    });

    console.log(verificationExists);

    if (!verificationExists) {
      return responseHelper.error(h, "VERIFICATIONEXISTS404");
    }

    if (verificationExists.is_revoked) {
      return responseHelper.error(h, "VERIFICATIONREVOKED400");
    }

    if (verificationExists.user.is_verified) {
      return responseHelper.error(h, "USERVERIFIED400");
    }

    // Revoke all the verification for user.
    await UserVerification.update({
      is_revoked: true,
    }, {
      where: { user_id: verificationExists.user.id, }
    });

    // Also verify the user.
    await User.update({
      is_verified: true,
    }, {
      where: {
        id: verificationExists.user.id,
      }
    });

    return responseHelper.success(h, "USERVERIFIED200");

  } catch (ex) {
    return responseHelper.error(h, "SERVER500", ex);
  }
}

const resendCode = async (req, h) => {

  try {

    const { email } = req.payload;

    // Check if userExists exists.
    const userFound = await User.findOne({
      where: {
        email,
      },
      raw: true,
      attributes: ['id', 'is_verified'],
    });

    // Does user exists?
    if (!userFound) {
      return responseHelper.error(h, "USEREXISTS404");
    }

    if (userFound.is_verified) {
      return responseHelper.error(h, "USERVERIFIED400");
    }

    // Revoke all previous otp of user.
    await UserVerification.update({
      is_revoked: true,
    }, {
      where: {
        user_id: userFound.id,
      },
    });

    // Create a new verification for user.
    const otp = userHelper.generateOtp();

    // Create a record in user verifications.
    await UserVerification.create({
      otp,
      user_id: userFound.id,
    });

    // Send the otp via mail to user.
    mailHelper(email, "User verification mail", `Your otp is ${otp}`);
    return responseHelper.success(h, "RESENDCODE200");

  } catch (ex) { 
    return responseHelper.error(h, "SERVER500", ex); 
  }

}

module.exports = {
  userLogin,
  userRegister,
  verifyUser,
  resendCode,
};
