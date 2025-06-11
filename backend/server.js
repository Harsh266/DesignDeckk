require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://designdeck.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Token-Expiring']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Cookie security options
const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

app.use((req, res, next) => {
    res.cookie = res.cookie.bind(res);
    const originalCookie = res.cookie;
    res.cookie = function (name, value, options = {}) {
        return originalCookie.call(this, name, value, { ...cookieConfig, ...options });
    };
    next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Root
app.get("/", (req, res) => {
    res.send("🚀 Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
