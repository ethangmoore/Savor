const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = newSchema({
    fullName: { type: String },
    email: {type: String },
    password: { type: String },
    createdOn: { type: Date, default: newDate().getTime() },
});

module.exports = mongoose.model("User", userSchema);