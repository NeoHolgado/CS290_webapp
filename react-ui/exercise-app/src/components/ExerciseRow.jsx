import React from 'react'
import { Link } from 'react-router-dom'
import { HiPencil, HiOutlineTrash } from "react-icons/hi"

/**
 * Exercise Row component
 * @param {*} param0 
 * @returns Row
 */
function ExerciseRow({ exercise, setExercises, setSelectedExercise }) {
    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' })
        if (response.status === 204) {
            setExercises((prev) => prev.filter((m) => m._id !== _id))
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }

    const handleEditClick = () => {
        setSelectedExercise(exercise)
    }

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <Link to={`/edit/${exercise._id}`} onClick={handleEditClick}>
                    <HiPencil></HiPencil>
                </Link>
                <HiOutlineTrash onClick={() => onDelete(exercise._id)}></HiOutlineTrash>
            </td>
        </tr>
    )
}

export default ExerciseRow
