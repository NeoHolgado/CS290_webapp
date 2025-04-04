import React from 'react'
import ExerciseRow from './ExerciseRow'

/**
 * Exercise Table component
 * @param {*} param0 
 * @returns Exercise Table
 */
function ExerciseTable({ exercises, setExercises, setSelectedExercise }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) => (
                    <ExerciseRow
                        key={exercise._id}
                        exercise={exercise}
                        setExercises={setExercises}
                        setSelectedExercise={setSelectedExercise}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default ExerciseTable
