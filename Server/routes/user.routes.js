const express = require("express");
const {
  getTicket,
  getAllBus,
  getUserByEmail,
  postTickets,
  addSupervisors,
  addAccount,
  addbus,
  deletebus,
  deleteSupervisors,
  getAccount,
  getSupervisors,
  deleteAccount,
} = require("../controllers/users.controller");
const router = express.Router();

// get all supervisors data
router.get("/supervisors", getSupervisors);
// delete supervisor
router.delete("/supervisors/:id", deleteSupervisors);

// get all bus data
router.get("/allbus", getAllBus);

// get user by email
router.get(`/users/:email`, getUserByEmail);

// add cart
router.post("/ticket", postTickets);

// post supervisor
router.post("/supervisor", addSupervisors);

// add accountsData
router.post("/add-account", addAccount);

// get all accountsData
router.get("/add-account", getAccount);



// delete account
router.delete("/delete-account/:id", deleteAccount);

// add bus
router.post("/addbus", addbus);

// delete a single bus by id
router.delete("/deletebus/:id", deletebus);

// get ticket (moved to the end)
router.get("/ticket", getTicket);

module.exports = router;
