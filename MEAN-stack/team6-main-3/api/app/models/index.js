const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.rooms = require("./room.model.js")(mongoose);
db.requirements = require("./requirement.model.js")(mongoose);

module.exports = db;