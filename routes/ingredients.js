const express = require('express');
const { getIngredients, suggestDishes } = require('../controllers/ingredientController');

const createIngredientsRouter = (dishes) => {
  const router = express.Router();

  // Get all unique ingredients
  router.get('/', getIngredients(dishes));

  // Suggest dishes based on ingredients
  router.post('/suggest', suggestDishes(dishes));

  return router;
};

module.exports = createIngredientsRouter;