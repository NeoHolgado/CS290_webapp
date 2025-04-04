import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Create Exercise page
 * @returns 
 */
function CreateExercisePage() {
    const navigate = useNavigate()

    // State for each exercise
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('lbs')
    const [date, setDate] = useState('')

    // Function to add a new exercise
    const addExercise = async () => {
        const newExercise = { name, reps: Number(reps), weight: Number(weight), unit, date }
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.status === 201) {
            alert('Exercise created successfully!')
        } else {
            alert(`Failed to create exercise, status code = ${response.status}`)
        }
        navigate('/')
    }

    return (
        <div>
            <h1>Create New Exercise</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    addExercise()
                }}
            >
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Reps:</label>
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Unit:</label>
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="MM-DD-YY"
                        required
                    />
                </div>
                <button type="submit">
                    Create Exercise
                </button>
            </form>
        </div>
    )
}

export default CreateExercisePage
