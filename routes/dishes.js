const express = require('express');
const { getAllDishes, getDishByName ,searchDishes} = require('../controllers/dishesController');

const createDishesRouter = (dishes) => {
  const router = express.Router();

  // Get all dishes with filtering, sorting, and pagination
  router.get('/', getAllDishes(dishes));
  router.get('/search', searchDishes(dishes));
  // Get dish by ID
  router.get('/:name', getDishByName(dishes));
  

  return router;
};

module.exports = createDishesRouter;