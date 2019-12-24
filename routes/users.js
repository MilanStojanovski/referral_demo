const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Referal = require("../models/referal");

const userRoutes = async (fastify, options) => {
    fastify.post(
        `${options.path}/register/:codeId`,
        fastify.validator.registerUserSchema,
        async (req, reply) => {
            try {
                // Check if user already exists?

                if (req.params.codeId) {
                    // If referal code submited
                    let referalCode = await Referal.findOne({
                        code: req.params.codeId
                    });

                    //console.log(referalCode, Object.keys(referalCode));
                    if (referalCode) {
                        // If referal code valid
                        req.body.credits = 10; // Award the new user with 10 credits

                        if (referalCode.count === 4) {
                            // If this is fifth referal
                            // Update inviter
                            await fastify.mongoService.updateSingleDocument(
                                User,
                                referalCode.userId,
                                { $inc: { credits: 10 } }
                            );
                        }

                        // Update the count of the referal code
                        await fastify.mongoService.updateSingleDocument(
                            Referal,
                            referalCode._id,
                            { $inc: { count: 1 } }
                        );
                    }
                }

                bcrypt.genSalt(8, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, async (err, hash) => {
                        if (err) {
                            throw err;
                        } else {
                            req.body.password = hash;

                            let newUser = await fastify.mongoService.saveSingleDocument(
                                // Create the new user
                                User,
                                req.body
                            );

                            reply
                                .type("application/json")
                                .code(200)
                                .send({ user: newUser, success: true });
                            fastify.logger.info(`STATUS: 200 OK`);
                        }
                    });
                });
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

module.exports = userRoutes;
