const mongoose = require("mongoose");
const ShoppingListSchema = require("./ShoppingList");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  shoppingLists: [ShoppingListSchema],
});

module.exports = mongoose.model("User", UserSchema);
