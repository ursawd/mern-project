require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//DATABASE_URL in .env file from Mongodb Atlas connect string
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", error => console.error("error"));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const restaurantRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
