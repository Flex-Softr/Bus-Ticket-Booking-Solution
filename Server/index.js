const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uczcxe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bdDistrictsCollection = client
      .db("cityTicket")
      .collection("bdDistricts");
    const accountsDataCollection = client
      .db("cityTicket")
      .collection("accountsData");
    const busDataCollection = client.db("cityTicket").collection("busData");
    const supervisorDataCollection = client
      .db("cityTicket")
      .collection("supervisorData");

    app.get("/ticket", async (req, res) => {
      const result = await bdDistrictsCollection.find().toArray();
      res.send(result);
    });

    // get all supervisors data
    app.get("/supervisors", async (req, res) => {
      const result = await supervisorDataCollection.find().toArray();
      res.send(result);
    });

    // get all bus data
    app.get("/allbus", async (req, res) => {
      const result = await busDataCollection.find().toArray();
      res.send(result);
    });

    // get user by email
    app.get(`/users/:email`, async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { email: email };
      const result = await accountsDataCollection.findOne(query);
      res.send(result);
    });

    // post operation=============================
    // add cart
    app.post("/ticket", async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await supervisorDataCollection.insertOne(item);
      res.send(result);
    });

    // add accountsData
    app.post("/add-account", async (req, res) => {
      const accountData = req.body;
      console.log("new account added", accountData);
      const result = await accountsDataCollection.insertOne(accountData);
      res.send(result);
    });

    // add bus
    app.post("/addbus", async (req, res) => {
      const body = req.body;
      const result = await busDataCollection.insertOne(body);
      res.send(result);
    });

    // delete a single bus by id
    app.delete("/deletebus/:id", async (req, res) => {
      const id = req.params.id;
      const result = await busDataCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Add this route for deleting multiple buses
    // app.delete('/deletebuses', async (req, res) => {
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
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Nabilar Chocolate House");
});

app.listen(port, () => {
  console.log(`Nabila loves chocolate ${port}`);
});
