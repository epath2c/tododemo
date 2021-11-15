import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, deleteItem, editItem }) => {
  return (
    <section className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div>
              <button className="edit-btn" onClick={() => editItem(id, title)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => deleteItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
