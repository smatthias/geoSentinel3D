// server.js (Express basic setup)
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router()

const users = []; // Replace with your DB!

const JWT_SECRET = 'your_jwt_secret';

// Register
router.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if(users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashed });
    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if(!user) return res.status(400).json({ message: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { email: user.email, name: user.name } });
});

export default router;
