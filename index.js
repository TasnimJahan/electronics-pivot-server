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
  const bookingCollection = client.db(`${process.env.DB_NAME}`).collection("bookings");


  

  app.post("/makeAnAdmin",(req, res) => {
    const newInfo = req.body;
    adminCollection.insertOne(newInfo)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})



// get admin
app.get('/admins', (req, res) => {
    adminCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});

//To see admin or not
app.post('/isAdmin', (req,res)=> {
  const email = req.body.email;
  adminCollection.find({ email : email })
  .toArray((err,doctors) =>{
    res.send(doctors.length > 0);
  })
})



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

app.get('/services/:id', (req, res) => {
    const id = ObjectId(req.params.id);
    serviceCollection.find(id)
    .toArray((err,items) => {
      res.send(items);
    })
})





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



app.post('/addBook', (req, res)=>{
    const newOrders =req.body;
    bookingCollection.insertOne(newOrders)
    .then(result =>{
        res.send(result.insertedCount > 0 );
        console.log(result);
    })
    console.log(newOrders);
})

app.get('/bookings', (req, res) => {
    bookingCollection.find({email: req.query.email})
        .toArray((err, documents) => {
            res.send(documents);
        })
});

app.get('/allBookings', (req, res) => {
    bookingCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});


app.delete('/deleteService/:id',(req, res) => {
    const id = ObjectId(req.params.id);
    serviceCollection.deleteOne({_id: id})
    .then(documents => {
      console.log(documents);
      res.send(documents.deletedCount > 0);
    })
  })
 







});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})