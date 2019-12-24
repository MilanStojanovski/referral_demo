const registerUserSchema = {
    schema: {
        tags: ["User"],
        summary: "Register user",
        body: {
            properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                password: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" }
            }
        },
        params: {
            properties: {
                codeId: { type: "string" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    user: {
                        type: "object",
                        properties: {
                            _id: { type: "string" },
                            firstName: { type: "string" },
                            lastName: { type: "string" },
                            email: { type: "string" },
                            phone: { type: "string" },
                            credits: { type: "string" }
                        }
                    },
                    success: { type: "boolean" }
                }
            },
            400: {
                type: "object",
                properties: {
                    error: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            success: { type: "boolean" }
                        }
                    }
                }
            }
        }
    }
};

const createReferalCodeSchema = {
    schema: {
        tags: ["Referal"],
        summary: "Create referal code",
        body: {
            type: "object",
            required: ["userId"],
            properties: {
                userId: { type: "string" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    referal: {
                        type: "object",
                        properties: {
                            userId: { type: "string" },
                            code: { type: "string" },
                            count: { type: "number" }
                        }
                    },
                    success: { type: "boolean" }
                }
            },
            400: {
                type: "object",
                properties: {
                    error: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            success: { type: "boolean" }
                        }
                    }
                }
            }
        }
    }
};

module.exports = {
    registerUserSchema,
    createReferalCodeSchema
};
