const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Adjust path as needed
const cors = require('cors');
const app = express();
const connectDB=require('./config/db');

app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

// app.use(cors());
app.use(cors({
  origin: "https://id-card-generator-frontend.vercel.app", // ✅ Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
  credentials: true, // ✅ Allow cookies if needed
}));
connectDB();
app.use("/api",userRoutes);
// Start server
const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;