import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Home.css";

const GetCharacters = () => {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [initialScrollPosition, setInitialScrollPosition] = useState(0);
    const detailsRef = useRef(null);
    const placeholderImage =
        "https://www.pedagojeux.fr/wp-content/uploads/2019/11/1280x720_LoL.jpg";

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const versionResponse = await axios.get(
                    "https://ddragon.leagueoflegends.com/api/versions.json"
                );
                const versions = versionResponse.data;
                const latestVersion = versions[0];

                const championsResponse = await axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
                );
                const championsData = championsResponse.data;
                const championsArray = Object.values(championsData.data).map(
                    (champion) => {
                        return {
                            ...champion,
                            image: champion.image
                                ? `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image.full}`
                                : placeholderImage,
                        };
                    }
                );
                setChampions(championsArray);
                setLoading(false);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des champions :",
                    error
                );
            }
        };
        fetchChampions();
    }, []);

    useEffect(() => {
        if (selectedChampion && detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChampion]);

    const handleChampionClick = (champion) => {
        setInitialScrollPosition(window.scrollY);
        setSelectedChampion(champion);
        setShowDetails(true);
    };

    const handleAddCharacter = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found!");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/characters",
                {
                    name: selectedChampion.name,
                    title: selectedChampion.title,
                    region: "League of legends",
                    description: selectedChampion.blurb,
                    image_url: selectedChampion.image,
                    category: selectedChampion.tags[0],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Character added successfully!");
        } catch (error) {
            alert(`Error: ${error.response.data.error}`);
        }
    };
    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedChampion(null);
        window.scrollTo(0, initialScrollPosition);
    };

    if (loading) {
        return <p>Chargement...</p>;
    }
    return (
        <div>
            <h1>Liste des Champions</h1>
            <div className="champions-container">
                {champions.map((champion) => (
                    <div
                        key={champion.id}
                        className="champion-card"
                        onClick={() => handleChampionClick(champion)}
                    >
                        <h2>{champion.name}</h2>
                        <img
                            src={champion.image}
                            alt={champion.name}
                            className="champion-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = placeholderImage;
                            }}
                        />
                        <p>{champion.title}</p>
                    </div>
                ))}
            </div>
            {showDetails && selectedChampion && (
                <div ref={detailsRef} className="champion-details">
                    <h2>{selectedChampion.name}</h2>
                    <img
                        src={selectedChampion.image}
                        alt={selectedChampion.name}
                        className="champion-details-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = placeholderImage;
                        }}
                    />
                    <p>{selectedChampion.title}</p>
                    <p>{selectedChampion.blurb}</p>
                    <button onClick={handleAddCharacter}>Add</button>
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
};

export default GetCharacters;
