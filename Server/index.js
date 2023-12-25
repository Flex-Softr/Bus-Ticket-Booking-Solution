const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// MVC
const userRouter = require("./routes/user.routes");
const usersController = require("./controllers/users.controller");

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust to your frontend URL
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uczcxe.mongodb.net`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const collections = {
      bdDistrictsCollection: client.db("cityTicket").collection("bdDistricts"),
      reservationCollection: client.db("cityTicket").collection("reservation"),
      accountsDataCollection: client
        .db("cityTicket")
        .collection("accountsData"),

      busDataCollection: client.db("cityTicket").collection("busData"),

      supervisorDataCollection: client
        .db("cityTicket")
        .collection("supervisorData"),

      seatDataCollection: client.db("cityTicket").collection("seat"),
    };

    usersController.setupCollections(collections);
    app.use(userRouter);

    console.log("Connected to MongoDB!");
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

app.get("/", (req, res) => {
  res.send("Nabilar Chocolate House");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

run().catch((error) => {
  console.error("Error during server startup:", error);
});
