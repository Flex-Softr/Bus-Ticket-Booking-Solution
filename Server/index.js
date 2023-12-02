const express = require('express');
const cors = require('cors'); // Make sure this line is present
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());
app.use(express());





const uri = `mongodb+srv://cityticket100:w28uAmpomBthxC7O@cluster0.2uczcxe.mongodb.net/?retryWrites=true&w=majority`;

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
    
    const bdDistrictsCollection=client.db('').collection('')

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get("/",(req,res)=>{
    res.send("Bus Ticket Booking Server is running")
})

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`)
})