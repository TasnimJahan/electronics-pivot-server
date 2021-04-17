const express = require('express')
const app = express();
const cors = require('cors');
// const fs = require('fs-extra');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const fileUpload =require('express-fileUpload');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('doctors')); //doctors folder e rakhbo tai ekhane doctors likhechi
// app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Hello World!')
})







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.stbya.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
//   const appointmentCollection = client.db(`${process.env.DB_NAME}`).collection("appointment");
  const adminCollection = client.db(`${process.env.DB_NAME}`).collection("admin");
  const serviceCollection = client.db(`${process.env.DB_NAME}`).collection("services");
  const reviewCollection = client.db(`${process.env.DB_NAME}`).collection("reviews");


  

  app.post("/makeAnAdmin",(req, res) => {
    const newInfo = req.body;
    adminCollection.insertOne(newInfo)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})



// j j doctor golo ache tader list eith name and pic show kora 
app.get('/admins', (req, res) => {
    adminCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});


app.post("/addServices",(req, res) => {
    const newInfo = req.body;
    serviceCollection.insertOne(newInfo)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})

app.get('/services', (req, res) => {
    serviceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});




app.post("/addReview",(req, res) => {
    const newInfo = req.body;
    reviewCollection.insertOne(newInfo)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})

app.get('/reviews', (req, res) => {
    reviewCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});








});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})