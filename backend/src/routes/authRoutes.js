import express from 'express';
import { login, register } from '../controllers/authController.js';


const authRoutes = express.Router();

// Route to register a new user
authRoutes.post('/register', register);

// Route to login a user
authRoutes.post('/login', login);

export default authRoutes;
