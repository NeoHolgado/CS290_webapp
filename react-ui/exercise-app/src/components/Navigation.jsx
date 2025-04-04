import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation component
 * Links to Home Page and Create Exercise Page
 * @returns 
 */
function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create Exercise</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
