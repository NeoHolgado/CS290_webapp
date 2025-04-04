import 'dotenv/config'
import express from 'express'
import asyncHandler from 'express-async-handler'
import * as exercises from './exerciseModel.mjs'

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, async() => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`)
})

/**
 * Validates date format
 * @param {*} date 
 * @returns 
 */
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/
    return format.test(date)
}

/**
 * Validates exercise format
 * @param {*} body 
 * @returns 
 */
function validateExercise(body) {
    const { name, reps, weight, unit, date } = body
    const allowedKeys = ['name', 'reps', 'weight', 'unit', 'date']
    const bodyKeys = Object.keys(body)

    // Check for extra or missing properties
    if (bodyKeys.length !== allowedKeys.length || !bodyKeys.every(key => allowedKeys.includes(key))) {
        return { valid: false, error: 'Invalid request: Extra or missing properties' }
    }

    // Validate each field
    if (typeof name !== 'string' || name.trim().length === 0) {
        return { valid: false, error: 'Invalid request: Name must be a string with at least one character' }
    }

    if (!Number.isInteger(reps) || reps <= 0) {
        return { valid: false, error: 'Invalid request: Reps must be an integer greater than 0' }
    }

    if (!Number.isInteger(weight) || weight <= 0) {
        return { valid: false, error: 'Invalid request: Weight must be an integer greater than 0' }
    }

    if (unit !== 'kgs' && unit !== 'lbs') {
        return { valid: false, error: 'Invalid request: Unit must be either "kgs" or "lbs"' }
    }

    if (!isDateValid(date)) {
        return { valid: false, error: 'Invalid request: Date must be in the format MM-DD-YY' }
    }

    return { valid: true }
}

// Create a new exercise -- POST /exercises
app.post('/exercises', asyncHandler(async (req, res) => {
    // Check if the new exercise matches the correct format
    const validation = validateExercise(req.body)
    if (!validation.valid) {
        return res.status(400).json({ Error: validation.error })
    }

    // Create the new exercise
    const { name, reps, weight, unit, date } = req.body
    const newExercise = await exercises.createExercise({ name, reps, weight, unit, date })
    res.status(201).json(newExercise)
}))

// Retrieve all exercises -- Get /exercises
app.get('/exercises', asyncHandler(async (req, res) => {
    const exercisesList = await exercises.getExercises()
    res.status(200).json(exercisesList)
}))

// Retrieve an exercise by ID -- GET /exercises/:id
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    // Extract id
    const {id} = req.params

    // Retrieve exercise
    const exercise = await exercises.getExerciseById(id)

    // If the exercise is not found give an error
    if (!exercise) {
        return res.status(404).json({ Error: 'Not found' })
    }
    // If the exercise is found, respoond with exercise
    res.status(200).json(exercise)
}))

// Update an exercise by ID -- PUT /exercises/:id
app.put('/exercises/:id', asyncHandler(async (req, res) => {
    // Extract ID and updates
    const {id} = req.params
    const updates = req.body

    // Validate the request body
    const validation = validateExercise(updates)
    if (!validation.valid) {
        return res.status(400).json({ Error: validation.error })
    }

    // Update the exercise
    const updatedExercise = await exercises.updateExercise(id, updates)

    // If no exercise is found, return an error
    if (!updatedExercise) {
        return res.status(404).json({ Error: 'Exercise not found' })
    }

    // If the exercise is found, respond with the updated exercise
    res.status(200).json(updatedExercise)
}))

// Delete an exercise by ID -- DELETE /exercises/:id
app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    // Extract ID
    const {id} = req.params;

    // Delete the exercise
    const deletedExercise = await exercises.deleteExercise(id);

    // If no exercise is found, return an error
    if (!deletedExercise) {
        return res.status(404).json({ Error: 'Not found' });
    }

    // If exercise is found, respond with empty body
    res.status(204).send();
}));

