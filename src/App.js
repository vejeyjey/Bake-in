import React, { useState } from "react";
import confetti from "canvas-confetti";

const pastries = [
  {
    id: 1,
    name: "Chocolate Cake",
    taste: "Sweet",
    equipment: ["Oven"],
    price: 250,
    ingredients: [
      { name: "Flour", price: 50 },
      { name: "Cocoa Powder", price: 70 },
      { name: "Sugar", price: 30 },
      { name: "Eggs", price: 40 },
      { name: "Butter", price: 60 },
    ],
  },
  {
    id: 2,
    name: "Vanilla Cupcake",
    taste: "Sweet",
    equipment: ["Oven"],
    price: 200,
    ingredients: [
      { name: "Flour", price: 50 },
      { name: "Sugar", price: 30 },
      { name: "Eggs", price: 40 },
      { name: "Butter", price: 60 },
      { name: "Vanilla Extract", price: 20 },
    ],
  },
  {
    id: 3,
    name: "Apple Pie",
    taste: "Sweet",
    equipment: ["Oven"],
    price: 300,
    ingredients: [
      { name: "Apples", price: 80 },
      { name: "Flour", price: 50 },
      { name: "Butter", price: 60 },
      { name: "Sugar", price: 30 },
      { name: "Cinnamon", price: 20 },
    ],
  },
  {
    id: 4,
    name: "Cheese Quiche",
    taste: "Savory",
    equipment: ["Oven"],
    price: 350,
    ingredients: [
      { name: "Eggs", price: 40 },
      { name: "Milk", price: 50 },
      { name: "Cheese", price: 80 },
      { name: "Flour", price: 50 },
      { name: "Butter", price: 60 },
    ],
  },
  {
    id: 5,
    name: "Garlic Bread",
    taste: "Savory",
    equipment: ["Oven"],
    price: 150,
    ingredients: [
      { name: "Bread", price: 40 },
      { name: "Garlic", price: 20 },
      { name: "Butter", price: 60 },
      { name: "Parsley", price: 30 },
    ],
  },
];

const FilterablePastryList = () => {
  const [selectedTaste, setSelectedTaste] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPastries, setFilteredPastries] = useState([]);
  const [selectedPastry, setSelectedPastry] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSearch = () => {
    setSelectedPastry(null);
    setSelectedIngredients([]);
    const results = pastries.filter(
      (pastry) =>
        (selectedTaste === "" || pastry.taste === selectedTaste) &&
        (selectedEquipment === "" ||
          pastry.equipment.includes(selectedEquipment)) &&
        (searchQuery === "" ||
          pastry.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredPastries(results);
  };

  const handleSelectPastry = (pastry) => {
    setSelectedPastry(pastry);
    setSelectedIngredients([]);
  };

  const handleToggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleCheckout = () => {
    confetti();
    const totalAmount = selectedIngredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    const checkoutMessage = document.createElement("div");
    checkoutMessage.innerText = `SOBRANG LATINA! NAKA CHECK OUT KA NA!
Total: ₱${totalAmount}`;
    checkoutMessage.style.position = "fixed";
    checkoutMessage.style.top = "50%";
    checkoutMessage.style.left = "50%";
    checkoutMessage.style.transform = "translate(-50%, -50%)";
    checkoutMessage.style.backgroundColor = "white";
    checkoutMessage.style.padding = "20px";
    checkoutMessage.style.fontSize = "24px";
    checkoutMessage.style.fontWeight = "bold";
    checkoutMessage.style.color = "black";
    checkoutMessage.style.border = "2px solid black";
    checkoutMessage.style.zIndex = "1000";
    document.body.appendChild(checkoutMessage);
    setTimeout(() => document.body.removeChild(checkoutMessage), 3000);
  };

  return (
    <div
      style={{
        backgroundColor: "#FCE4EC",
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#4E342E", fontSize: "36px" }}>🍰 Bake-In</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <select
          onChange={(e) => setSelectedTaste(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          <option value="">Select Taste</option>
          <option value="Sweet">Sweet</option>
          <option value="Savory">Savory</option>
        </select>
        <select
          onChange={(e) => setSelectedEquipment(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          <option value="">Select Equipment</option>
          <option value="Oven">Oven</option>
          <option value="Stovetop">Stovetop</option>
          <option value="Microwave">Microwave</option>
        </select>
        <input
          type="text"
          placeholder="Search pastry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            color: "black",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#D7CCC8",
          }}
        >
          Search
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredPastries.map((pastry) => (
          <div
            key={pastry.id}
            onClick={() => handleSelectPastry(pastry)}
            style={{
              backgroundColor: "#FFF3E0",
              padding: "15px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <strong>{pastry.name}</strong> - ₱{pastry.price}
          </div>
        ))}
      </div>
      {selectedPastry && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedPastry.name} Ingredients</h2>
          {selectedPastry.ingredients.map((ingredient, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              <input
                type="checkbox"
                onChange={() => handleToggleIngredient(ingredient)}
                checked={selectedIngredients.includes(ingredient)}
              />
              {ingredient.name} - ₱{ingredient.price}
            </div>
          ))}
          <button
            onClick={handleCheckout}
            style={{
              color: "black",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "#D7CCC8",
              marginTop: "10px",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterablePastryList;
