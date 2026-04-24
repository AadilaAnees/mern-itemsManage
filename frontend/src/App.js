import React, { useState, useEffect } from "react";
import ItemCard from "./components/ItemCard";
import ItemForm from "./components/ItemForm";
import { fetchItems, createItem, updateItem, deleteItem } from "./services/itemService";

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await fetchItems();
      setItems(res.data);
      setError("");
    } catch (err) {
      setError("❌ Failed to connect to backend. Is your server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createItem(data);
      setShowForm(false);
      loadItems();
    } catch (err) {
      alert("Failed to create item: " + err.response?.data?.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateItem(editingItem._id, data);
      setEditingItem(null);
      loadItems();
    } catch (err) {
      alert("Failed to update item: " + err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>📦 Item Manager</h1>
          <p style={styles.subtitle}>Manage your inventory</p>
        </div>
        <button
          style={styles.btnAdd}
          onClick={() => { setEditingItem(null); setShowForm(!showForm); }}
        >
          {showForm ? "✕ Close" : "+ Add Item"}
        </button>
      </header>

      <main style={styles.main}>
        {(showForm || editingItem) && (
          <div style={styles.formWrapper}>
            <ItemForm
              onSubmit={editingItem ? handleUpdate : handleCreate}
              existingItem={editingItem}
              onCancel={() => { setEditingItem(null); setShowForm(false); }}
            />
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <p style={styles.status}>Loading items...</p>
        ) : items.length === 0 ? (
          <div style={styles.empty}>
            <p>No items yet. Click <strong>+ Add Item</strong> to get started!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={(item) => { setEditingItem(item); setShowForm(false); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { margin: 0, fontSize: "24px", fontWeight: "800", color: "#111827" },
  subtitle: { margin: "4px 0 0", fontSize: "14px", color: "#6b7280" },
  btnAdd: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
  },
  main: { maxWidth: "1100px", margin: "0 auto", padding: "32px 20px" },
  formWrapper: { marginBottom: "32px", display: "flex", justifyContent: "center" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  status: { textAlign: "center", color: "#6b7280", fontSize: "16px" },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: "12px",
    border: "2px dashed #e5e7eb",
    color: "#6b7280",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "14px 20px",
    borderRadius: "8px",
    marginBottom: "24px",
    fontSize: "14px",
  },
};

export default App;
