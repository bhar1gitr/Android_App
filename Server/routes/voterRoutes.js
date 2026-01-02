const express = require('express');
const router = express.Router();
const { getAllVoters, seedVoters, getVoterById } = require('../controllers/voterController');

router.get('/voters', getAllVoters);
router.post('/seed', seedVoters); // Run this once to add data
router.get('/voters/:id', getVoterById);

module.exports = router;