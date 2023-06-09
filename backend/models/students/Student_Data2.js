// create a nested mongodb scheme
const mongoose = require('mongoose');

const stdPerAddressSchema = new mongoose.Schema({
	flatNo:  { type: String, required: true },
    area:  { type: String, required: true },
	landmark: { type: String, required: false },
	locality:  { type: String, required: true },
    city:  { type: String, required: true },
    postalCode:  { type: String, required: true },
    country:  { type: String, required: true },
    province:  { type: String, required: true }
});

const stdQualifySchema = new mongoose.Schema({
    qualifyLevel: { type: String, required: true },
    qualifyName: { type: String, required: true },
	board:  { type: String, required: true },
    rollNum:  { type: String, required: true },
	passYear: { type: String, required: true },
	resultStatus:  { type: String, required: true },
    gradeSys: { type: String, required: true },
	grade:  { type: String, required: true },
});

const stdTempAddressSchema = new mongoose.Schema({
	flatNo:  { type: String, required: true },
    area:  { type: String, required: true },
	landmark: { type: String, required: false },
	locality:  { type: String, required: true },
    city:  { type: String, required: true },
    postalCode:  { type: String, required: true },
    country:  { type: String, required: true },
    province:  { type: String, required: true }
});

const stdProfileSchema = new mongoose.Schema({
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
	gender:  { type: String, required: true },
    dob:  { type: String, required: true },
	enrollNum: { type: String, required: true },
	mobNum:  { type: String, required: true },
    alternateNum:  { type: String, required: false },
    aadharNum:  { type: String, required: true },
    disability:  { type: String, required: true },
    bloodGroup:  { type: String, required: true },
    caste:  { type: String, required: true },
    religion:  { type: String, required: true },
    nationality:  { type: String, required: true },
    state:  { type: String, required: true },
    city:  { type: String, required: true },
});

const studentData = new mongoose.Schema({
    studentId:  { type: String, required: true },
    stdprofile: {type: stdProfileSchema, required: true},
    stdperadd: {type: stdPerAddressSchema, required: true},
    stdtempadd: {type: stdTempAddressSchema, required:true},
    stdeducat: [stdQualifySchema]
})

module.exports = mongoose.model("student_data", studentData);