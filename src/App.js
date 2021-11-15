import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let storage = localStorage.getItem("list");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

const App = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ ifShow: false, type: "", msg: "" });
  const [isEdit, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      showAlert(true, "danger", "Please Enter Something!");
    } else if (todo && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: todo };
          }
          return item;
        })
      );
      showAlert(true, "success", "You edited a todo");
      setTodo("");
      setIsEditing(false);
      //reset the form
    } else {
      const newItem = { id: new Date().getTime().toString(), title: todo };
      setList([...list, newItem]);
      setTodo("");
      showAlert(true, "success", "You added a todo.");
    }
  };

  const showAlert = (ifShow = false, type = "", msg = "") => {
    setAlert({ ifShow, type, msg });
  };

  const clearAll = () => {
    setList([]);
    showAlert(true, "danger", "You removed all the items!");
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "You deleted one item");
  };

  const editItem = (id, title) => {
    setEditId(id);
    setTodo(title);
    setIsEditing(true);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={onFormSubmit}>
        {alert.ifShow && (
          <Alert {...alert} removeAlert={showAlert} list={list} />
        )}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="e.g. eggs"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
          <button className="submit-btn">{isEdit ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearAll}>
            clear all
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
