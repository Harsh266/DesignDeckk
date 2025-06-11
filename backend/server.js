// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const http = require('http'); // ✅ Needed for socket.io or manual server control

require('./config/passport'); // 🔒 Passport strategies

const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app); // ✅ Create server from express app

// 🧩 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://designdeck.onrender.com", // Example: http://localhost:3000
  credentials: true,
}));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// 🔗 Routes
app.use('/auth', authRoutes);

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// 🏠 Root Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running & MongoDB connected!");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
