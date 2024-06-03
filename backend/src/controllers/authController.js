import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';



// Register a new user
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new userModel({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
};

// Login a user
const login = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            id: user._id,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export { register, login };
