// backend/server.js - Main entry point

const express = require('express');
const cors = require('cors');
const { loadDishes } = require('./services/csvLoader'); // Import CSV loader
const dishesRoutes = require('./routes/dishes'); // Import dishes routes
const ingredientsRoutes = require('./routes/ingredients'); // Import ingredients routes

const app = express();
app.use(cors());
app.use(express.json());

const initializeServer = async () => {
  try {
    // Load dishes data from CSV
    const dishes = await loadDishes();
    console.log(`✅ Dishes loaded: ${dishes.length}`);

    // Register API routes with dishes data
    app.use('/dishes', dishesRoutes(dishes)); // Pass dishes to routes
    app.use('/ingredients', ingredientsRoutes(dishes)); 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error initializing server:", error);
    process.exit(1); // Exit the process if initialization fails
  }
};

initializeServer(); 

module.exports = { app }; 