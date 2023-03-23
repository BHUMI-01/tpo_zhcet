// Define the schema for the admin
const mongoose = require('mongoose');
const validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['recruiter', 'admin', 'superadmin'],
      default: 'recruiter'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create a model for the admin
  // const Admin = mongoose.model('Admin', adminSchema);
  
  // // Example of how to create an admin in the model
  // const newAdmin = new Admin({
  //   username: 'admin',
  //   password: '$2a$10$MKY3cm65DyQc8setpocNzuFfz3flhsqWWgQN4sEHlEORJAtAbFoV2',
  //   email: 'admin@gmail.com',
  //   role: 'admin'
  // });
  
  // newAdmin.save((err, admin) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Admin created:', admin);
  //   }
  // });

  module.exports = mongoose.model("admins", adminSchema);
  