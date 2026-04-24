const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // ---- EXISTING FIELDS (do not remove) ----
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, "Item category is required"],
      trim: true,
      enum: ["Electronics", "Clothing", "Food", "Books", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Item", itemSchema);
