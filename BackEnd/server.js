// Using nodemon to update changes to the server without terminating
// Run using: nodemon server.js
// Using environment variables as they are more secure when using GitHub, remaining invisible
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Middleware
// Using express.json for easier JSON data handling
app.use(express.json());

// Schema for the travel data
const Schema = mongoose.Schema;
const travelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    stay: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facilities: {
        type: Number,
        required: true
    }
});

// Model based on the schema
const travelModel = mongoose.model('travel', travelSchema);

// Routes
//add a new travel location
app.post('/api/travel', async (req, res) => {
    const { title, stay, rating, description, facilities } = req.body;

    try {
        const travel = await travelModel.create({ title, stay, rating, description, facilities });
        res.json(travel);
    } catch (error) {
        res.json({ error: 'Location failed to add' });
    }
});

// a travel location by ID
app.put('/api/travel/:id', async (req, res) => {
    const { id } = req.params;
        //Check if a vaild id is used
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: 'No location found' });
    }

    const travel = await travelModel.findOneAndUpdate({ _id: id }, { ...req.body });

    res.json(travel);
});

//delete a travel location by ID
app.delete('/api/travel/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: 'No location found' });
    }

    const travel = await travelModel.findOneAndDelete({ _id: id });
});

// retrieve all travel locations sorted by creation date
app.get('/api/travel', async (req, res) => {
    const travel = await travelModel.find({}).sort({ createdAt: -1 });

    res.json(travel);
});

// retrieve a specific travel location by ID
app.get('/api/travel/:id', async (req, res) => {
    const { id } = req.params;
    //Check if a vaild id is used
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: 'No location found' });
    }

    const travel = await travelModel.findById(id);

    res.json(travel);
});

// Connect to the database using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO)
    .then(() => {
        // Listen for requests on the port from the environment variable
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
