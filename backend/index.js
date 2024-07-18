const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
dotenv.config();

app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const MONGO_URI = 'mongodb://localhost:27017/TODOS'; // Directly declared MongoDB URI

// MongoDB Connection
const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB at ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', taskRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
