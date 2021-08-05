const app = require("./server");
const { config } = require("./config");

// start Server
app.listen(config.app.PORT, () => {
  config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
});
