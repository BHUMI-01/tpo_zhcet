// Define the schema for the event post
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    "title": "string",
    "description": "string",
    "date": "date",
    "location": {
        "address": "string",
        "city": "string",
        "state": "string",
        "country": "string",
        "zipCode": "string"
    },
    "organizer": {
        "name": "string",
        "email": "string",
        "phone": "string"
    },
    
    "supportiveDocs": "string",
    "createdAt": "date",
    "updatedAt": "date"
});

module.exports = mongoose.model("events", eventSchema);

// "attendees": [{
//     "name": "string",
//     "email": "string",
//     "phone": "string"
// }],