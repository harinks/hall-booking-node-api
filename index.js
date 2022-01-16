const express = require('express');
const app = require(express);
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";

app.use(express.json());

//create hall
app.post("/create-hall", async (req, res) => {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("hallBooking");
        await db.collection("hall").insertOne(req.body);
        res.json({
            message: "hall created",
        });
        connection.close();
    } catch (error) {
        console.log(error);
    }
});

//booking a hall
app.post("/create-booking-hall", async (req, res) => {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("hallBooking");
        await db.collection("bookingHall").insertOne(req.body);
        res.json({
            message: "Hall is booked",
        });
        connection.close();
    } catch (error) {
        console.log(error);
    }
});

//list all customers booked hall
app.get('/booking-hall', async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("hallBooking")
        let users = await db.collection("bookingHall").find({}).toArray();
        await connection.close();
        res.json(users)

    } catch (error) {
        console.log(error)
    }
})

//list all halls with booked data
app.get("/hallList/:booking-hall", async (req, res) => {
    let connection = await mongoClient.connect(URL);
    let db = connection.db("hallBooking");
    let booked = await db.collection("bookingHall").find({ RoomName: req.params.Roomid }).toArray();
    if(booked){
    res.json({
      message: "hall details of booked data",
      data : booked[0].halls
    });
    }
    else{
        console.log("error")
    }
  });

app.listen(3001)