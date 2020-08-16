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

// require controllers
const routes = require("./controllers");

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
    // db.Book.find({})
    //     .then(dbBook => {
    //         res.json(dbBook);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});

// update a specific workout 
app.put("/api/workouts/:id", (req, res) => {
    // db.Library.find({})
    //     .then(dbLibrary => {
    //         res.json(dbLibrary);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});

// create a new workout 
app.post("/api/workouts", (req, res) => {
    // db.Library.find({})
    //     .populate("books")
    //     .then(dbLibrary => {
    //         res.json(dbLibrary);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});

// get a range of the workouts 
app.get("/api/workouts", (req, res) => {
    // db.Book.find({})
    //     .then(dbBook => {
    //         res.json(dbBook);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});