import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../Filter/Filter";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/characters?category=${selectedCategory}`
                );
                const charactersWithUserCount = response.data.map((item) => ({
                    ...item.character,
                    userCount: item.userCount,
                }));
                setCharacters(charactersWithUserCount);
            } catch (error) {
                console.error(
                    "There was an error fetching the characters!",
                    error
                );
            }
        };

        fetchCharacters();
    }, [selectedCategory]);

    return (
        <div>
            <h1>All Characters added by Users</h1>
            <Filter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ul>
                {characters.map((character) => (
                    <li key={character._id}>
                        <div>
                            <p>{character.name}</p>
                            <p>
                                Number of User who added this character:{" "}
                                {character.userCount}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Characters;
