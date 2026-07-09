import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function AddPlant() {
  const navigate = useNavigate();

  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [watering, setWatering] = useState("");
  const [image, setImage] = useState("");

  const addPlant = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const { error } = await supabase.from("plants").insert([
      {
        plant_name: plantName,
        plant_type: plantType,
        watering_frequency: watering,
        image_url: image,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("🌱 Plant Added Successfully!");

    setPlantName("");
    setPlantType("");
    setWatering("");
    setImage("");

    navigate("/plants");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "green" }}>
        ➕ Add Plant
      </h1>

      <form onSubmit={addPlant}>
        <label>Plant Name</label>
        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          placeholder="Enter Plant Name"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Plant Type</label>
        <select
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          <option value="">Select Type</option>
          <option value="Flower">Flower</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>

        <label>Watering Frequency</label>
        <input
          type="text"
          value={watering}
          onChange={(e) => setWatering(e.target.value)}
          placeholder="Daily / Weekly"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Paste Image URL"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Plant 🌱
        </button>
      </form>
    </div>
  );
}

export default AddPlant;