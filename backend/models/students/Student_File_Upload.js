const mongoose = require('mongoose');

const studentFileSchema = new mongoose.Schema({
    studentId:  { type: String, required: true },
    file: { type: String}
});


module.exports = mongoose.model("student_file_upload", studentFileSchema);