const bcrypt = require("bcrypt");
const User = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).send({ error: "Password is required" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            ...req.body,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.send({ message: "Login successful", token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const userId = req.user.id;
    const { username, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .send({ error: "Incorrect current password" });
        }

        user.username = username;
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 8);
        }

        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
};
