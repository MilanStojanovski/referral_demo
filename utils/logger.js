const bunyan = require("bunyan");
const PrettyStream = require("bunyan-prettystream");

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

const log = bunyan.createLogger({
    name: "referal_logger",
    streams: [
        {
            level: "info",
            type: "raw",
            stream: prettyStdOut
        },
        {
            level: "warn",
            type: "raw",
            stream: prettyStdOut
        },
        {
            level: "error",
            type: "raw",
            stream: prettyStdOut
        },
        {
            level: "debug",
            type: "raw",
            stream: prettyStdOut
        }
    ]
});
module.exports = log;
