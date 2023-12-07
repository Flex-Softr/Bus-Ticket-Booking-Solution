const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


//middle ware
app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uczcxe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bdDistrictsCollection = client.db('cityTicket').collection('bdDistricts');
    const accountsDataCollection = client.db('cityTicket').collection('accountsData');


    const supervisorDataCollection = client.db('cityTicket').collection('supervisorData');

    app.get('/ticket', async (req, res) => {
        const result = await bdDistrictsCollection.find().toArray();
        res.send(result);
    })

   // post operation=============================
  // add cart
  app.post('/ticket', async (req, res) => {
    const item = req.body;
    console.log(item)
    const result = await supervisorDataCollection.insertOne(item);
    res.send(result);
  })

  // add accountsData
   app.post('/add-account',async(req, res)=>{
    const accountData=req.body;
    console.log("new account added",accountData)
    const result = await accountsDataCollection.insertOne(accountData);
    res.send(result)
   })

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{

    res.send('Nabilar Chocolate House')

})

app.listen(port, ()=>{
    console.log(`Nabila loves chocolate ${port}`)
})