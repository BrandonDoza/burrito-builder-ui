import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      name: name,
      ingredients: ingredients
    }
    if (ingredients.length === 0) {
      document.getElementById('error-element').innerText="You must choose at least one ingredient, please start over"
    } else if (name === '') {
      document.getElementById('error-element').innerText="You must add your name, please start over"
    } else {
      addOrder(newOrder)
    }
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function handleChange(e) {
    setName(e.target.value)
  }

  function addIngredients(e) {
    e.preventDefault()
    setIngredients(prevIngredients => {
      return [...prevIngredients, e.target.name]
    })
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={addIngredients}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      <p id="error-element"></p>

      <button onClick={(e) => handleSubmit(e)} className="order-button">Submit Order</button>
    </form>
  );
}

export default OrderForm;
