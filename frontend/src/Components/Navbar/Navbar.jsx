import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
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
                <li>
                    <a href="/" onClick={handleLogout}>
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
