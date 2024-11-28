import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./Components/Wrapper/Wrapper.jsx";

import "./App.css";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import MyCharacters from "./Components/Mycharacters/Mycharacters.jsx";

function App() {
    return (
        <BrowserRouter>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-characters" element={<MyCharacters />} />
                </Routes>
            </Wrapper>
        </BrowserRouter>
    );
}

export default App;
