const Character = require("../Models/CharactersModel");
const User = require("../Models/UsersModel");

const getCharacter = async (req, res) => {
    try {
        const characters = await Character.findById(req.params.id);
        if (!characters) {
            return res.status(404).send({ error: "Character not found" });
        }
        res.send(characters);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getAllCharacters = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = {
                $regex: req.query.category,
                $options: "i",
            };
        }

        const characters = await Character.aggregate([
            { $match: filter },

            {
                $group: {
                    _id: "$name",
                    character: { $first: "$$ROOT" },
                    userCount: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    character: 1,
                    userCount: 1,
                },
            },
        ]);

        res.send(characters);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getCharacterPerUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const filter = { user: userId };
        if (req.query.category) {
            filter.category = {
                $regex: req.query.category,
                $options: "i",
            };
        }

        const characters = await Character.find(filter).populate(
            "user",
            "username"
        );
        res.send(characters);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const createCharacter = async (req, res) => {
    const userId = req.user.id;
    try {
        const existingCharacter = await Character.findOne({
            user: userId,
            name: req.body.name,
        });
        if (existingCharacter) {
            return res
                .status(400)
                .send({ error: "You already have this character" });
        }

        const character = new Character({ ...req.body, user: userId });
        await character.save();
        res.send(character);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const updateCharacter = async (req, res) => {
    const userId = req.user.id;
    const characterId = req.params.id;
    const updateFields = req.body;

    try {
        const character = await Character.findOne({
            _id: characterId,
            user: userId,
        });
        if (!character) {
            return res.status(404).send({
                error: "Character not found or you do not have permission to update this character",
            });
        }

        Object.assign(character, updateFields);
        await character.save();

        res.send(character);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteCharacter = async (req, res) => {
    const userId = req.user.id;
    const characterId = req.params.id;

    try {
        const character = await Character.findOneAndDelete({
            _id: characterId,
            user: userId,
        });
        if (!character) {
            return res.status(404).send({
                error: "Character not found or you do not have permission to delete this character",
            });
        }
        res.send(character);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = {
    getCharacter,
    getAllCharacters,
    getCharacterPerUser,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
