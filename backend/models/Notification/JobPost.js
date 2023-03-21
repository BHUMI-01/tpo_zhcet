const mongoose = require("mongoose");
const validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");

const jobschema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  lastApplyDate: { type: String, required: true },
  requirements: {
    type: String,
    required: true,
  },
  stipend: { type: String, required: false },
  supportiveDocs: { type: String, required: false },
  
  description: { type: String, required: false },
});

module.exports = mongoose.model("jobs", jobschema);
