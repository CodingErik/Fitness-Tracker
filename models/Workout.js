// require mongo to use the library 
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
	// creates type attribute
	type: String, 
	// creates name attribute
	name: String,
	// creates duration attribute
	duration: Number,
	// creates distance attribute
	distance: Number,
	// creates weight attribute
	weight: Number,
	// creates reps attribute
	reps: Number,
	// creates sets attribute
	sets: Number,
});

const WorkoutSchema = new Schema({
    day: {
		type: Date,
		default: Date.now
    },
    // this will show the exercises for the day 
    exercises: [ExerciseSchema]

});


// compiling a model with the specified information
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;