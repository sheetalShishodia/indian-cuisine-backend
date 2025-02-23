const getIngredients = (dishes) => (req, res) => {
    const ingredients = [...new Set(dishes.flatMap(dish => dish.ingredients))];
    res.json(ingredients);
  };
  
  const suggestDishes = (dishes) => (req, res) => {
    const { ingredients } = req.body;
    const suggestedDishes = dishes.filter(dish =>
      ingredients.every(ingredient => dish.ingredients.includes(ingredient))
    );
    res.json(suggestedDishes);
  };
  
  module.exports = { getIngredients, suggestDishes };