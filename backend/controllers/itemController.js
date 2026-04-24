const Item = require("../models/Item");

// @desc    Get all items
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create item
// @route   POST /api/items
const createItem = async (req, res) => {
  try {
    const { name, description, price, inStock, category } = req.body;

    const item = await Item.create({
      name,
      description,
      price,
      inStock,
      category,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (req.body.name !== undefined) item.name = req.body.name;
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.price !== undefined) item.price = req.body.price;
    if (req.body.inStock !== undefined) item.inStock = req.body.inStock;
    if (req.body.category !== undefined) item.category = req.body.category;
    // TODO: Add your new field update here

    const updated = await item.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
