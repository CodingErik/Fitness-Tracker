// require mongo to use the library 
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date
    },
    // this will show the exercises for the day 
    exercises: [
        {
            // this id referencing the model 
            type: Schema.Types.ObjectId,
            /// the reference of the Exercise collection
            ref: "Exercise"
        }
    ]
});


// compiling a model with the specified information
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;