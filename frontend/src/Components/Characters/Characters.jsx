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
                setCharacters(response.data);
            } catch (error) {
                console.error(
                    "There was an error fetching the characters!",
                    error
                );
            }
        };

        fetchCharacters();
    }, [selectedCategory]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/characters/${id}`);
            // Refetch characters after deletion
            const response = await axios.get(
                `http://localhost:8080/characters?category=${selectedCategory}`
            );
            setCharacters(response.data);
        } catch (error) {
            console.error("There was an error deleting the character!", error);
        }
    };

    return (
        <div>
            <h1>Characters</h1>
            <Filter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ul>
                {characters.map((character) => (
                    <li key={character._id}>
                        <div>
                            {character.name}
                            <button onClick={() => handleDelete(character._id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Characters;
