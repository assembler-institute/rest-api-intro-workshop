const app = require("./server");
const { config } = require("./config");
const connect = require("./db/connect");
const seed = require("./db/seed");

connect()
  .then(async () => {
    config.logger.info(`DB connected`);

    // await seed.seedUsers();
    // await seed.seedPersons();
    // await seed.seedMovies();
    await seed.seedRoles();

    // start Server
    app.listen(config.app.PORT, () => {
      config.logger.info(
        `Server running at http://localhost:${config.app.PORT}`,
      );
    });
  })
  .catch((err) => {
    config.logger.error(err);
  });
