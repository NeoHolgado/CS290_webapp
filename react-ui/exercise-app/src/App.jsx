import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from '../src/pages/HomePage';
import EditExercisePage from '../src/pages/EditExercisePage';
import CreateExercisePage from '../src/pages/CreateExercisePage';
import Navigation from '../src/components/Navigation';
import '../src/App.css'

/**
 * Main app
 * @returns 
 */
function App() {
    const [selectedExercise, setSelectedExercise] = useState(null);

    return (
        <Router>
            <div className="app">
                <header>
                    <h1>Exercise Tracker</h1>
                    <p>Track your exercises and stay fit!!!</p>
                    <Navigation />
                </header>

                <Routes>
                    <Route path="/" element={<HomePage setSelectedExercise={setSelectedExercise} />} />
                    <Route path="/edit/:id" element={<EditExercisePage exerciseToEdit={selectedExercise} />} />
                    <Route path="/create" element={<CreateExercisePage />} />
                </Routes>

                <footer>©2024 Neo Holgado</footer>
            </div>
        </Router>
    );
}

export default App;
