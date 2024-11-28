import React from "react";

const Filter = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            <option value="mage">Mage</option>
            <option value="marksman">Marksman</option>
            <option value="assassin">Assassin</option>
            <option value="tank">Tank</option>
            <option value="fighter">Fighter</option>
            <option value="support">Support</option>
        </select>
    );
};

export default Filter;
