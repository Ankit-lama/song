const usermodel = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { username, email, password } = req.body;
    const existingUser = await usermodel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(409).json({ message: 'Username or email already exists' });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a user
    const user = await usermodel.create({ username, email, password: hashedPassword, role: req.body.role });
    //create a token
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
    //set the token in the cookie
    res.cookie('token', token, { httpOnly: true });
    //send the token in the response
    res.status(201).json({ 
        message: 'User registered successfully',
        username: user.username,
        email: user.email,
        role: user.role,
        token: token 
     });
}

async function login(req, res) {
    const { username, email, password } = req.body;
    const user = await usermodel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ 
        message: 'User logged in successfully',
        username: user.username,
        email: user.email,
        role: user.role,
        token: token 
     });
}

async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = { register, login, logout };