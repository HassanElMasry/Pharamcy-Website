const { default: mongoose } = require('mongoose');
const Patient = require('../Models/patient.js');
const PharmacistRequest = require("../Models/pharmacistRequest.js")
const { isUsernameUnique, isEmailUnique, validatePassword } = require('../utils');
const validator = require('validator');
const upload = require('../Routes/multer-config');
const Cart = require('../Models/Cart.js');
const stripe = require('stripe')(process.env.STRIPE_KEY);

//Function for Stripe
async function createStripeCustomer({ Email, Name, Phone }) {
  return new Promise(async (resolve, reject) => {
    try {
      const Customer = await stripe.customers.create({
        name: Name,
        email: Email,
        phone: Phone
      });

      resolve(Customer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

// Task 1 : register as a patient
const registerPatient = async (req, res) => {
  const {
    Username,
    Name,
    Email,
    Password,
    DateOfBirth,
    Gender,
    MobileNumber,
    EmergencyContactName,
    EmergencyContactMobile,
    EmergencyContactRelation,
    address
  } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Methods', POST, DELETE, GET, PUT );
  // req.setHeader('Access-Control-Allow-Methods', POST, DELETE, GET, PUT );

  try {

    if (!(await isUsernameUnique(Username))) {
      throw new Error('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      throw new Error('Email is already in use.');
    }

    if(!(await validatePassword(Password))){
      return res.status(400).json("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
    }

    //create a new cart for the patient
    const newCart = await Cart.create({
      items: [],
      totalAmount: 0,
    });

    const customer = await createStripeCustomer({ Email, Name, MobileNumber });

    const patient = await Patient.register(
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      Gender,
      MobileNumber,
      EmergencyContactName,
      EmergencyContactMobile,
      EmergencyContactRelation,
      address,
      newCart
    );
    await patient.save();
    res.status(200).json({ patient })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Tasks 1 and 9 : register as a pharmacist
const submitRequestToBePharmacist = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const {
    Username,
    Name,
    Email,
    Password,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  try {
    if (!req.files || !req.files['IDDocument'] || !req.files['PharmacyDegreeDocument'] || !req.files['WorkingLicenseDocument']) {
      return res.status(400).json('Missing file(s)');
    }

    if (!(await isUsernameUnique(Username))) {
      res.status(400).json('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      res.status(400).json('Email is already in use.');
    }

    if(!(await validatePassword(Password))){
      return res.status(400).json("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
    }

    const request = new PharmacistRequest({
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      IDDocument: {
        data: Buffer.from(req.files['IDDocument'][0].buffer),
        contentType: req.files['IDDocument'][0].mimetype,
      },
      PharmacyDegreeDocument: {
        data: Buffer.from(req.files['PharmacyDegreeDocument'][0].buffer),
        contentType: req.files['PharmacyDegreeDocument'][0].mimetype,
      },
      WorkingLicenseDocument: {
        data: Buffer.from(req.files['WorkingLicenseDocument'][0].buffer),
        contentType: req.files['WorkingLicenseDocument'][0].mimetype,
      },
    });

    request.save();
    res.status(200).json({ request });

  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};


module.exports = {
  registerPatient,
  submitRequestToBePharmacist
};