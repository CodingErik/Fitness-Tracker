// express to set up server 
const express = require("express");
// dev tool to see request coming in 
const logger = require("morgan");
// added orm to handle request database
const mongoose = require("mongoose");
// require path 
const path = require("path");

// shortcicuit the port 
const PORT = process.env.PORT || 3000;

// require content from models folder 
const db = require("./models");
// const { runInNewContext } = require("vm");
// const { resolveSoa } = require("dns");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route calls to the public folder to serve the data 
app.use(express.static("public"));

// connects to workout database/ deployment process 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// HTML ROUTES 
// **********************************************
// index page 
app.get('/', (req, res) => {
    // send user to the index of the page 
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
// exercise page
app.get('/exercise', (req, res) => {
    // send user to the index of the page 
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});


// stats page
app.get('/stats', (req, res) => {
    // send user to the index of the page 
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});


// API ROUTES 
// **********************************************  
// get all the workouts 
/// this is working [DONE]
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err.message);
        })
});

// update a specific workout
// this is working  
app.put("/api/workouts/:id", async (req, res) => {
    db.Workout.update(
        // update workout
        { _id: mongoose.Types.ObjectId(req.params.id) }, // where id is given id
        { $push: { exercises: req.body } }, // add new exercise 
        { new: true } // return the updated object
    )
        .then((data) => res.json(data)) 
        .catch((err) => res.json(err)); 

});

// create a new workout 
/// this is working [DONE]
app.post("/api/workouts", async ({ body }, res) => {
    // create a new workout 
    try {
        let data = await db.Workout.create(body)
        console.log({ data });
        res.json(data);
    } catch ({ message }) {
        res.json(message);
    }
});

// get a range of the workouts 
app.get("/api/workouts/range", (req, res) => {
    // create a new workout 
    //  try {
    //     let data = await db.Workout.find({})
    //     console.log({ data });
    //     res.json(data);
    // } catch ({ message }) {
    //     res.json(message);
    // }
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});