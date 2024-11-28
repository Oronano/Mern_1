import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../Filter/Filter";

const MyCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8080/characters/user?category=${selectedCategory}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCharacters(response.data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };

        fetchCharacters();
    }, [selectedCategory]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found!");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/characters/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCharacters(
                characters.filter((character) => character._id !== id)
            );
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    };

    return (
        <div>
            <h1>My Characters</h1>
            <Filter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ul>
                {characters.map((character) => (
                    <li key={character._id}>
                        <h2>{character.name}</h2>
                        <img src={character.image_url} alt={character.name} />
                        <p>
                            <strong>Title:</strong> {character.title}
                        </p>
                        <p>
                            <strong>Region:</strong> {character.region}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {character.description}
                        </p>
                        <button onClick={() => handleDelete(character._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyCharacters;
