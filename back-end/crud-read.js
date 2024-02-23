const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
require("dotenv").config({ path: "./config.env"});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;


const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("chop_database");
    const coll = db.collection("recipes");
    // find code goes here
    const cursor = coll.find();
    // iterate code goes here
    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

