require("dotenv").config();
const fastify = require("fastify")();
const log = require("./utils/logger");
const config = require("./config/config");
const mongoService = require("./utils/mongoService");
const documentation = require("./utils/documentation");
const validation = require("./validation/serverSchemas");

fastify.decorate("logger", log);
fastify.decorate("config", config);
fastify.decorate("validator", validation);
fastify.decorate("mongoService", mongoService);

fastify.register(require("./utils/dbConnector"), {
    url: fastify.config.mongoURI
});

fastify.register(require("fastify-swagger"), documentation);

fastify.register(require("./routes/users"), {
    prefix: "/v1",
    path: "/api/users"
});
fastify.register(require("./routes/referals"), {
    prefix: "/v1",
    path: "/api/referals"
});

fastify.listen(config.port, function(err, address) {
    if (err) {
        log.error(err);
        process.exit(1);
    }
    fastify.swagger();
    fastify.logger.info(`server listening on ${address}`);
});
