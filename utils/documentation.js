const documentation = {
    routePrefix: "/documentation",
    exposeRoute: true,
    swagger: {
        info: {
            title: "Referals Demo",
            description: "Swagger documentation for Referals Demo",
            version: "0.1.0"
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here"
        },
        host: "127.0.0.1:3000/",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "User", description: "User related end-points" }],
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }
    }
};

module.exports = documentation;
