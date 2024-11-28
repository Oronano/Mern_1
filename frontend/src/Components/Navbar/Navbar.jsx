import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="simplenavbar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/register">Register</a>
                </li>
                <li>
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                    <a href="/my-characters">My Characters</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
