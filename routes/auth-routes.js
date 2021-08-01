const { authController } = require("../controllers");
const { authValidation, registerValidation, verifyValidation, resendValidation } = require("../validations");

module.exports = { 

  name: "auth",
  register: (server, options) => {

    const routes = [
      {
        method: "POST",
        path: "/auth/login",
        config: {
          auth: false,
          description: "Login route",
          tags: ["api"],
          handler: authController.userLogin,
          validate: {
            payload: authValidation,
          }
        }
      },
      {
        method: "POST",
        path: "/auth/register",
        config: {
          auth: false,
          description: "Register Route",
          tags: ["api"],
          handler: authController.userRegister,
          validate: {
            payload: registerValidation,
          }
        }
      },
      {
        method: "POST",
        path: "/auth/verify",
        config: {
          auth: false,
          description: "Verify Route",
          tags: ["api"],
          handler: authController.verifyUser,
          validate: {
            payload: verifyValidation,
          }
        }
      },
      {
        method: "POST",
        path: "/auth/resend",
        config: {
          auth: false,
          description: "Resend code route",
          description: "Resend code",
          tags: ["api"],
          handler: authController.resendCode,
          validate: {
            payload: resendValidation,
          }
        }
      }
    ];

    server.route(routes);

  },

};