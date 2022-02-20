const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//Route endpoints for restaurants

//-------------------------------
//Get all
router.get("/", async (req, res) => {
	try {
		const restaurants = await Restaurant.find();
		res.json(restaurants);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//-------------------------------
//Get one
router.get("/:id", getRestaurant, (req, res) => {
	res.json(res.restaurant);
});

//-------------------------------
//Create one
router.post("/", async (req, res) => {
	const restuarant = new Restaurant({
		borough: req.body.borough,
		cuisine: req.body.cuisine,
	});
	try {
		const newRestaurant = await restuarant.save();
		res.status(201).json(newRestaurant);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//-------------------------------
//Update one
router.patch("/:id", getRestaurant, async (req, res) => {
	if (req.body.borough != null) {
		res.restaurant.borough = req.body.borough;
	}
	if (req.body.cuisine != null) {
		res.restaurant.cuisine = req.body.cuisine;
	}
	try {
		const updated = await res.restaurant.save();
		res.json(updated);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//-------------------------------
//Delete one
router.delete("/:id", getRestaurant, async (req, res) => {
	try {
		await res.restaurant.remove();
		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//=======================Middleware===========================
async function getRestaurant(req, res, next) {
	//middleware to add found restaurant to response object
	let restaurant;
	try {
		restaurant = await Restaurant.findById(req.params.id);
		if (restaurant == null) {
			return res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	//add to response object
	res.restaurant = restaurant;
	next();
}
//=============================================================
module.exports = router;
