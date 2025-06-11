// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const http = require('http');

require('./config/passport');

const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS - allow frontend to send cookies
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., https://designdeck.vercel.app
  credentials: true,
}));

// ✅ Session (used by passport-google and optional otherwise)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ Only secure in production
    sameSite: 'None', // ✅ Must be None for cross-site cookie
  }
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/auth', authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running & MongoDB connected!");
});

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
