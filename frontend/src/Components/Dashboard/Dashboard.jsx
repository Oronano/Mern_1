import React from "react";
import Users from "../Users/Users";
import Characters from "../Characters/Characters";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Users />
            <Characters />
        </div>
    );
};

export default Dashboard;
