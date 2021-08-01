const { Server } = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");

const HapiSwagger = require("hapi-swagger");

const routes = require("./routes");
const { constants: { Environment: { HOST, PORT } } } = require("./config");

const server = new Server({
  host: HOST,
  port: PORT,
  routes: {
    cors: true,
  },
});

const App = async () => {

  const swaggerOptions = {
    info: {
      title: 'Hapi Authentication API Documentation',
      version: '1.0.0.0',
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.register(routes);

  console.log(`Server on port ${PORT}`);
  await server.start();

};

App();
