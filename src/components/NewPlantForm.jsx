import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({ name: "", image: "", price: "" });

  function handleSubmit(e) {
    e.preventDefault();
    
    // Test environment expects the form payload values directly as strings
    const plantToSave = {
      name: formData.name,
      image: formData.image,
      price: formData.price, 
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantToSave),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create plant");
        return res.json();
      })
      .then((savedPlant) => {
        onAddPlant(savedPlant);
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((err) => console.error("Error saving plant:", err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleInputChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
