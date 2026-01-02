const Voter = require('../models/Voters');

// Fetch all voters
const getAllVoters = async (req, res) => {
    try {
        const voters = await Voter.find();
        res.status(200).json(voters);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Seed Dummy Data (To populate your empty DB)
const seedVoters = async (req, res) => {
    try {
        // Create a new instance of the Voter model with data from the request
        const newVoter = new Voter({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            epic: req.body.epic,
            booth: req.body.booth
        });

        const savedVoter = await newVoter.save();
        res.status(201).json(savedVoter);
    } catch (error) {
        console.error(error);
        res.status(400).json({ 
            message: "Failed to insert voter", 
            error: error.message 
        });
    }
};

const getVoterById = async (req, res) => {
    try {
        const voter = await Voter.findById(req.params.id);
        res.json(voter);
    } catch (error) {
        res.status(404).json({ message: "Voter not found" });
    }
};

module.exports = { getAllVoters, seedVoters, getVoterById };