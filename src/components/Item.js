import React from "react";

function Item({ item, onUpdateCart, onDelete }) {

  function handleClick(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
    .then(r => r.json())
    .then(data => {
      onUpdateCart(data)
    })
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      onDelete(item)
    })
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
      className={item.isInCart ? "remove" : "add"}
      onClick={() => handleClick(item.id)}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button 
      className="remove"
      onClick={handleDelete}
      >Delete</button>
    </li>
  );
}

export default Item;
