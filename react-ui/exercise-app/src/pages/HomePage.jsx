import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

/**
 * Home Page
 * @param {*} param0 
 * @returns 
 */
function HomePage({ setSelectedExercise }) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const loadExercises = async () => {
            const response = await fetch('/exercises');
            const data = await response.json();
            setExercises(data);
        };
        loadExercises();
    }, []);

    return (
        <div>
            <h1>Exercise List</h1>
            <Link to="/create">
                <button>Create New Exercise</button>
            </Link>
            <ExerciseTable exercises={exercises} setExercises={setExercises} setSelectedExercise={setSelectedExercise} />
        </div>
    );
}

export default HomePage;
