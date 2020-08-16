// require mongo to use the library 
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    // creates the Field type
    type: String,
    // creates the Field name
    name: String,
    // creates the Field duration
    duration: Number,
    // creates the Field weight
    weight:Number,
    // creates the Field reps
    reps:Number,
    // creates the Field sets
    sets:Number,
    // created the distance field 
    distance: Number
});


// compiling a model with the specified information
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;