const mongoose = require("mongoose");
const RoulleteDataSchema = new mongoose.Schema({
  Data: [],
});
const RoulleteData = mongoose.model("roulleteDataHistory", RoulleteDataSchema);
module.exports = RoulleteData;
