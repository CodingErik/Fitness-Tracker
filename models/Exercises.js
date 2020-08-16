// require mongo to use the library 
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    }
});


// compiling a model with the specified information
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;