const { default: mongoose } = require('mongoose');
const Medicine = require("../Models/medicine");

// Task 12: view a list of all available medicines
const availableMedicinesDetailsByPharmacist = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicines = await Medicine.find();
      if (!medicines) {
        res.status(400).json({ error: "There are no available medicines!" })
      }
      res.status(200).json(medicines.map(({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold }) => ({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold })));
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// View all medicines'Quantities and Sales
const availableMedicinesQuantity = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicines = await Medicine.find();
      if (!medicines) {
        res.status(400).json({ error: "There are no available medicines!" })
      }
      res.status(200).json(medicines.map(
        ({ Name, Picture, Quantity, QuantitySold }) =>
          ({ Name, Picture, Quantity, QuantitySold })
      ));
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// Task 13: view available quantity and sales of each medicine
const medQuantityAndSales = async (req, res) => {
  const { Name, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const medicine = await Medicine.findOne({ Name: Name }, { _id: 0, Price: 0, ActiveIngredients: 0 });
      if (!medicine) {
        res.status(400).json({ error: "This medicine doesn't exist!" })
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

// add a new medicine to the database
const addMedicine = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const {Username} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{

    const { Name,
      ActiveIngredients,
      Price,
      Quantity,
      QuantitySold,
      MedicalUse } = req.body;

    try {
      const medecineExists = await Medicine.findOne({ Name: Name });

      if (medecineExists) {
        return res.status(400).json({ error: "This medicine already exists!" });
      }

      const newMed = await Medicine.create({
        Name: Name,
        ActiveIngredients: ActiveIngredients,
        Price: Price,
        Quantity: Quantity,
        Picture: req.file.originalname,
        QuantitySold: QuantitySold,
        MedicalUse: MedicalUse
      });
      await newMed.save();
      res.status(200).json(newMed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

//Task 18: Update a medicine in the database
const updateMed = async (req, res) => {

  const { Name, Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {

      const medExists = await Medicine.findOne({ Name: Name });
      if (!medExists) {
        return res.status(404).json({ error: "This medicine doesn't exist!" });
      }

      let updateData = { ...req.body };

      // Check if a picture file is provided
      if (req.file) {
        updateData.Picture = req.file.originalname;
      }

      const updatedMed = await Medicine.findOneAndUpdate({ Name: Name }, updateData, { new: true });

      if (!updatedMed) {
        return res.status(404).json({ error: "No possible updates!" });
      }

      res.status(200).json(updatedMed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};


// Search for medicine by name
const getMedicineByName = async (req, res) => {
  const { Name , Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{

    const info = await Medicine.findOne({ Name: Name }, { _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse: 0 });
    if (!info) {
      return res.status(400).json({ error: "This medicine does not exist!" })
    }
    res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Filter medicine by medical use
const getMedicineByMedicalUse = async (req, res) => {
  const { MedicalUse, Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const info = await Medicine.findOne({ MedicalUse: MedicalUse }, { _id: 0, Name: 0, ActiveIngredients: 0, Price: 0, Picture: 0 });
      if (!info) {
        return res.status(400).json({ error: "This medicine does not exist!" })
      }
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  availableMedicinesDetailsByPharmacist,
  availableMedicinesQuantity,
  medQuantityAndSales,
  addMedicine,
  updateMed,
  getMedicineByName,
  getMedicineByMedicalUse
};
