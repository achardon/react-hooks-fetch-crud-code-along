import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(r => r.json())
    .then((items) => setItems(items))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function addItem(newItem) {
    setItems([...items, newItem])
  }

  function updateCart(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      else {
        return item;
      }
    });
    setItems(updatedItems)
  }

  function deleteItem(deletedItem) {
    const updatedItems = items.filter(item => {
      return item.id !== deletedItem.id
    })
    setItems(updatedItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm 
      onAddItem={addItem}
      />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onUpdateCart={updateCart}
          onDelete={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
