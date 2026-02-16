import User from '../model/user.js';

export async function createUser(req, res) {
    try {
        // Check if both email and password are provided in the request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists." });
        }

        // Create new user using Sequelize
        const userData = await User.create({
            email: req.body.email,
            password: req.body.password
        });

        console.log("User created:", userData.id);
        res.status(201).json({
            message: "User created successfully",
            user: { id: userData.id, email: userData.email }
        });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

export async function fetchUser(req, res) {
    try {
        let where = {};

        // Build query based on request body
        if (req.body.email) {
            where.email = req.body.email;
        }

        // Fetch users using Sequelize
        const users = await User.findAll({
            where: where,
            attributes: ['id', 'email', 'createdAt', 'updatedAt'] // Exclude password
        });

        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

export function greet() {
    console.log("hello baby");
}
