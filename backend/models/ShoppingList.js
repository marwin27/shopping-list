const mongoose = require("mongoose");
const ItemSchema = require("./Item");

const ShoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [ItemSchema],
});

module.exports = ShoppingListSchema;
