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
app.put("/api/workouts/:id", async ({ params, body }, res) => {
    try {
        let data = await db.Workout.update({ _id: ObjectId(params) },{ $push: { exercises: body } });
        console.log(data, "this is the workout")
        res.json(data);
    } catch ({ message }) {
        res.json(message);
    }
});

// create a new workout 
/// this is working 
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