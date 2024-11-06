const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const Cart = require("./Cart.js");
function arrayLimit(val) {
  return val.length > 0;
}

const patientSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
      enum: ["female", "male"],
    },
    MobileNumber: {
      type: String,
      required: true,
    },
    EmergencyContactName: {
      type: String,
      required: true,
    },
    EmergencyContactMobile: {
      type: String,
      required: true,
    },
    EmergencyContactRelation: {
      type: String,
      required: true,
    },
    Prescriptions: {
      type: Array,
      required: false,
    },
    addresses: [
      {
        type: String,
        required: false,
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    StripeCustomerId: {
      type: String,
      required: false,
    },
    WalletAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

patientSchema.statics.register = async function (
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
) {
  if (
    !Username ||
    !Name ||
    !Email ||
    !Password ||
    !DateOfBirth ||
    !Gender ||
    !MobileNumber ||
    !EmergencyContactName ||
    !EmergencyContactMobile ||
    !EmergencyContactRelation
  ) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(Email)) {
    throw Error("Invalid email format.");
  }

  const existsUsername = await this.findOne({ Username });
  const existsEmail = await this.findOne({ Email });

  if (existsUsername) {
    throw new Error("Username is already taken.");
  }

  if (existsEmail) {
    throw new Error("Email is already in use.");
  }

  const newCart = await Cart.create({
    items: [],
    totalAmount: 0,
  });
  const patient = await this.create({
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
    cart: newCart,
  });
  patient.addresses.push(address);

  return patient;
};

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
