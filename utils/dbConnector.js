const fastifyPlugin = require("fastify-plugin");
const mongoose = require("mongoose");

async function dbConnector(fastify, options) {
    const url = options.url;
    delete options.url;

    const db = await mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    mongoose.Promise = global.Promise;
    fastify.decorate("mongo", db);
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector);
