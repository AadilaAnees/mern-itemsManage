import React from "react";

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.name}>{item.name}</h3>
        <span style={{ ...styles.badge, background: item.inStock ? "#dcfce7" : "#fee2e2", color: item.inStock ? "#166534" : "#991b1b" }}>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <p style={styles.description}>{item.description}</p>

      <div style={styles.details}>
        <span style={styles.price}>LKR {Number(item.price).toFixed(2)}</span>

    
            {item.category && (
              <span style={styles.tag}>📦 {item.category}</span>
            )}    
            
      </div>

      <div style={styles.actions}>
        <button onClick={() => onEdit(item)} style={styles.btnEdit}>
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(item._id)} style={styles.btnDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid #e5e7eb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
  },
  name: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  description: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  details: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2563eb",
  },
  tag: {
    background: "#f3f4f6",
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#374151",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  btnEdit: {
    background: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
  btnDelete: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
};

export default ItemCard;
