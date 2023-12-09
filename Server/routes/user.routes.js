const express = require('express');
const {
  getTicket,
  getSupervisors,
  getAllBus,
  getUserByEmail,
  postTickets,
  addSupervisors,
  addAccount,
  addbus,
  deletebus
} = require('../controllers/users.controller');
const router = express.Router();

// get all supervisors data
router.get('/supervisors', getSupervisors);


// get all bus data
router.get('/allbus', getAllBus);

// get user by email
router.get(`/users/:email`, getUserByEmail);

// post operation=============================
// add cart
router.post('/ticket', postTickets);

// post
router.post('/supervisor', addSupervisors);

// add accountsData
router.post('/add-account', addAccount);

// add bus
router.post('/addbus', addbus);

// delete a single bus by id
router.delete('/deletebus/:id', deletebus);

// get ticket (moved to the end)
router.get('/ticket', getTicket);

module.exports = router;
