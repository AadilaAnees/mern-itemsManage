import React, { useState, useEffect } from "react";

// =============================================
// TODO: Add your new field(s) to the initialState object below
// Example: category: "Other",
// =============================================
const initialState = {
  name: "",
  description: "",
  price: "",
  inStock: true,
  category: "Other"
  // TODO: Add your new field here
  // category: "Other",
};

function ItemForm({ onSubmit, existingItem, onCancel }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (existingItem) {
      setFormData({
        name: existingItem.name || "",
        description: existingItem.description || "",
        price: existingItem.price || "",
        inStock: existingItem.inStock ?? true,
        category: existingItem.category || "Other",
        // =============================================
        // TODO: Pre-fill your new field when editing
        // Example: category: existingItem.category || "Other",
        // =============================================
      });
    } else {
      setFormData(initialState);
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      // =============================================
      // TODO: Parse/format your new field if needed
      // Example for number: quantity: parseInt(formData.quantity),
      // =============================================
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{existingItem ? "Edit Item" : "Add New Item"}</h2>

      {/* --- EXISTING FIELDS --- */}
      <div style={styles.field}>
        <label>Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Item name"
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Item description"
          style={{ ...styles.input, height: "80px" }}
        />
      </div>

      <div style={styles.field}>
        <label>Price (LKR) *</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="0.00"
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label>
          <input
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
          />
          In Stock
        </label>
      </div>

        
          <div style={styles.field}>
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
    

      <div style={styles.buttons}>
        <button type="submit" style={styles.btnPrimary}>
          {existingItem ? "Update Item" : "Add Item"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.btnSecondary}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "480px",
    width: "100%",
  },
  field: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },
  btnPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  btnSecondary: {
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #ddd",
    padding: "10px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ItemForm;
