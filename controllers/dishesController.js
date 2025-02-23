const { query } = require("express");

const getAllDishes = (dishes) => (req, res) => {
  let results = [...dishes];
  // Filtering
  if (req.query.diet) {
    results = results.filter(dish => dish.diet === req.query.diet);
  }
  if (req.query.flavor) {
    results = results.filter(dish => dish.flavor_profile === req.query.flavor);
  }
  if (req.query.state) {
    results = results.filter(dish => dish.state === req.query.state);
  }

  // Sorting
  if (req.query.sortBy) {
    const [field, order] = req.query.sortBy.split(':');
    results.sort((a, b) => (order === 'asc' ? a[field] - b[field] : b[field] - a[field]));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  results = results.slice(startIndex, endIndex);

  res.json(results);
};

const getDishByName = (dishes) => (req, res) => {
  const dishName = req.params.name;

  if (!dishName) {
    return res.status(400).json({ message: "Dish name is required" });
  }

  const dish = dishes.find(d => d.name.toLowerCase() === dishName.toLowerCase());

  if (!dish) {
    return res.status(404).json({ message: "Dish not found" });
  }

  res.json(dish);
};
const searchDishes = (dishes) => (req, res) => {
  const query = req.query.query?.toLowerCase().trim();

  if (!query) {
    return res.status(400).json({ message: "Query is required and must be a string" });
  }
  // Search by name, ingredients, and origin (handling undefined values safely)
  const results = dishes.filter(dish =>
    (dish.name && dish.name.toLowerCase().includes(query)) ||
    (Array.isArray(dish.ingredients) 
      ? dish.ingredients.some(ingredient => ingredient?.toLowerCase().includes(query))
      : dish.ingredients && dish.ingredients.toLowerCase().includes(query)) ||
    (dish.state && dish.state.toLowerCase().includes(query))
  );

  res.json(results.slice(0, 10)); // Limit to 10 results
};





module.exports = { getAllDishes, getDishByName,searchDishes  };