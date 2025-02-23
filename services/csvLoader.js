const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const loadDishes = () => {
  return new Promise((resolve, reject) => {
    const dishes = [];
    fs.createReadStream(path.join(__dirname, '../data/indian_food.csv'))
      .pipe(csv())
      .on('data', (row) => dishes.push(row))
      .on('end', () => resolve(dishes))
      .on('error', (error) => reject(error));
  });
};

module.exports = { loadDishes };