const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//Route endpoints for restaurants
//
//Get all
router.get("/", async (req, res) => {
	try {
		const restaurants = await Restaurant.find();
		res.json(restaurants);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Get one
router.get("/:id", (req, res) => {
	res.send(req.params.id);
});
//Create one
router.post("/", (req, res) => {});
//Update one
router.patch("/:id", (req, res) => {});
//Delete one
router.delete("/:id", (req, res) => {});

async function get(req, res, next) {
	try {
	} catch (err) {}
}

module.exports = router;
