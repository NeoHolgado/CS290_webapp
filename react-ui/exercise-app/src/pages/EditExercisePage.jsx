import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Edit Exercise page
 * @param {*} param0 
 * @returns 
 */
function EditExercisePage({ exerciseToEdit }) {
    const navigate = useNavigate()

    // State for each exercise
    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)

    // Function to edit the exercise
    const editExercise = async () => {
        const updatedExercise = { name, reps, weight, unit, date }

        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedExercise),
        })

        if (response.ok) {
            alert('Exercise updated successfully!')
        } else {
            alert(`Failed to update exercise, status code = ${response.status}`)
        }
        navigate('/')
    }

    return (
        <div>
            <h1>Edit Exercise</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    editExercise()
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
                        onChange={(e) => setReps(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
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
                    Update Exercise
                </button>
            </form>
        </div>
    )
}

export default EditExercisePage
