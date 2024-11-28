const express = require("express");

const authMiddleware = require("./AuthMiddleware/AuthMiddleware");
const {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("./Controllers/UsersController");

const {
    getCharacter,
    getAllCharacters,
    getCharacterPerUser,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} = require("./Controllers/CharactersController");

const router = express.Router();

// Route for User
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);
router.get("/users", getAllUsers);
router.put("/user", authMiddleware, updateUser);
router.delete("/user", authMiddleware, deleteUser);

// Route for Characters
router.get("/characters", getAllCharacters);
router.get("/characters/user", authMiddleware, getCharacterPerUser);
router.get("/characters/:id", getCharacter);
router.post("/characters", authMiddleware, createCharacter);
router.put("/characters/:id", authMiddleware, updateCharacter);
router.delete("/characters/:id", authMiddleware, deleteCharacter);

module.exports = router;
