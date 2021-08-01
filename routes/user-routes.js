const { userController } = require("../controllers");
const { headerValidation } = require("../validations");

module.exports = {

  name: "user",
  register: (server, options) => {

    const routes = [
      {
        method: "GET",
        path: "/user/details",
        config: {
          // auth: "default",
          description: "User details",
          tags: ["api"],
          handler: userController.getUserDetails,
          validate: {
            headers: headerValidation,
          }
        },
      }      
    ];

    server.route(routes);

  },

};
