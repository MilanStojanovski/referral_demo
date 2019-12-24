const Referal = require("../models/referal");
const { randomString } = require("../utils/helpers");

const referalRoutes = async (fastify, options) => {
    fastify.post(
        `${options.path}/create`,
        fastify.validator.createReferalCodeSchema,
        async (req, reply) => {
            try {
                let referalData = {};
                referalData.userId = req.body.userId; // Assign the user as the owner of the referal code/link
                referalData.code = randomString(8); // Generate random string as referal code

                // Check if user already has a referal code
                let referalCode = await Referal.findOne({
                    userId: referalData.userId
                });
                if (referalCode) {
                    // User already has a referal code
                    let message =
                        error.message || "User already has a referal code";
                    const err = { message, success: false };
                    reply
                        .type("application/json")
                        .code(400)
                        .send({ error: err });
                    fastify.logger.error(`ERROR:  ${error.message}`);
                    return;
                }

                let newReferal = await fastify.mongoService.saveSingleDocument(
                    // Create the new referal
                    Referal,
                    referalData
                );

                reply
                    .type("application/json")
                    .code(200)
                    .send({ referal: newReferal, success: true });
                fastify.logger.info(`STATUS: 200 OK`);
            } catch (error) {
                let message = error.message || "Something went wrong";
                const err = { message, success: false };
                reply
                    .type("application/json")
                    .code(400)
                    .send({ error: err });
                fastify.logger.error(`ERROR:  ${error.message}`);
            }
        }
    );
};

module.exports = referalRoutes;
