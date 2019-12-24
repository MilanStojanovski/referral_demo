const mongoose = require("mongoose");

const referalSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    code: { type: String, required: true },
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model("referals", referalSchema);
