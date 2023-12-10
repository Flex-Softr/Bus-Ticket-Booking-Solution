const { ObjectId } = require("mongodb");
let bdDistrictsCollection;
let accountsDataCollection;
let busDataCollection;
let supervisorDataCollection;

// Function to set up collections
exports.setupCollections = (collections) => {
  bdDistrictsCollection = collections.bdDistrictsCollection;
  accountsDataCollection = collections.accountsDataCollection;
  busDataCollection = collections.busDataCollection;
  supervisorDataCollection = collections.supervisorDataCollection;
};

const express = require("express");

// get Tickets
exports.getTicket = async (req, res) => {
  const result = await bdDistrictsCollection.find().toArray();
  res.send(result);
};

// get account
exports.getAccount = async (req, res) => {
  const result = await accountsDataCollection.find().toArray();
  res.send(result);
};

// Get supervisors
exports.getSupervisors = async (req, res) => {
  const result = await supervisorDataCollection.find().toArray();
  res.send(result);
};

//  Get allbus
exports.getAllBus = async (req, res) => {
  const result = await busDataCollection.find().toArray();
  res.send(result);
};

//   get user by email

exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const query = { email: email };
  const result = await accountsDataCollection.findOne(query);
  res.send(result);
};

//   post ticket

exports.postTickets = async (req, res) => {
  const item = req.body;
  console.log(item);
  const result = await supervisorDataCollection.insertOne(item);
  res.send(result);
};

//   add supervisers

exports.addSupervisors = async (req, res) => {
  const item = req.body;
  console.log(item);
  const result = await supervisorDataCollection.insertOne(item);
  res.send(result);
};

//   add account
exports.addAccount = async (req, res) => {
  const accountData = req.body;
  console.log("new account added", accountData);
  const result = await accountsDataCollection.insertOne(accountData);
  res.send(result);
};

//    add bus

exports.addbus = async (req, res) => {
  const body = req.body;
  const result = await busDataCollection.insertOne(body);
  res.send(result);
};

//   delete bus

exports.deletebus = async (req, res) => {
  const id = req.params.id;
  const result = await busDataCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};
//   delete deleteSupervisors

exports.deleteSupervisors = async (req, res) => {
  const id = req.params.id;
  const result = await supervisorDataCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

// Add this route for deleting multiple buses
// router.delete('/deletebuses', async (req, res) => {
//   const { busIds } = req.body;

//   try {
//     // Assume you have a Bus model
//     const result = await busDataCollection.deleteMany({ _id: { $in: busIds } });

//     if (result.deletedCount > 0) {
//       res.status(200).json({ message: 'Buses deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'No buses found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Send a ping to confirm a successful connection