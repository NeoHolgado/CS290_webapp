import mongoose from "mongoose"
import 'dotenv/config'

let connection = undefined

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// Defind the schema
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
})
const Exercise = mongoose.model('Exercise', exerciseSchema)

/**
 * Creates a new exercise
 * @param {*} data 
 * @returns newExercise
 */
async function createExercise(data) {
    try {
        const newExercise = await Exercise.create(data)
        return newExercise
    } catch (err) {
        console.log(err)
        throw Error(`Error creating exercise: ${err.message}`)
    }
}

/**
 * Retrieves all exercises
 * @returns All exercises
 */
async function getExercises() {
    try{
        const exercises = await Exercise.find()
        return exercises
    } catch(err) {
        console.log(err)
        throw Error(`Error retrieving all exercises: ${err.message}`)
    }
}

/**
 * Retrieves an exercise by ID
 * @param {*} id 
 * @returns Exercise specified by ID
 */
async function getExerciseById(id) {
    try {
        const exercise = await Exercise.findById(id)
        return exercise
    } catch(err) {
        console.log(err)
        throw Error(`Error retrieving exercise by ID: ${err.message}`)
    }
    
}

/**
 * Updates an exercise by ID
 * @param {*} id 
 * @param {*} updates 
 * @returns Updated exercise
 */
async function updateExercise(id, updates) {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(id, updates, { new:true })
        return updatedExercise
    } catch(err) {
        console.log(err)
        throw Error(`Error updating exercise by ID: ${err.message}`)
    }
}

/**
 * Deletes an exercise by ID
 * @param {*} id 
 * @returns 
 */
async function deleteExercise(id) {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(id)
        return deletedExercise
    } catch(err) {
        console.log(err)
        throw Error(`Error deleting exercise by ID: ${err.message}`)
    }
}


export { connect, createExercise, getExercises, getExerciseById, updateExercise, deleteExercise }