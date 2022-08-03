const mongoose = require("mongoose");
// const UserModel = require("./UserModel");

const contactSchema = new mongoose.Schema({

  contact: [{
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    email: String,
    phoneNumber: {
      type: String,
      required: true,
      minLength: 10,
    },
    country: {
      type: String,
      required: true,
    },
    
  },
  
  
],

userId: String,
  
});

const ContactModel = mongoose.model("contactModel", contactSchema);

module.exports = ContactModel;
