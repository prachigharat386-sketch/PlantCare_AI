import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { supabase } from "../services/supabase";

function Dashboard() {
  const navigate = useNavigate();

  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const { data, error } = await supabase
      .from("plants")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setPlants(data || []);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plant?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("plants")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete Failed!");
    } else {
      alert("Plant Deleted Successfully!");
      fetchPlants();
    }
  };

  const filteredPlants = plants.filter((plant) => {
    const matchSearch = plant.plant_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || plant.plant_type === filter;

    return matchSearch && matchFilter;
  });

  const total = plants.length;
  const flower = plants.filter((p) => p.plant_type === "Flower").length;
  const indoor = plants.filter((p) => p.plant_type === "Indoor").length;
  const outdoor = plants.filter((p) => p.plant_type === "Outdoor").length;

  return (
    <div className="dashboard">
      <h1>🌱 Plant Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dash-card">
          <h2>{total}</h2>
          <p>Total Plants</p>
        </div>

        <div className="dash-card">
          <h2>{flower}</h2>
          <p>Flower Plants</p>
        </div>

        <div className="dash-card">
          <h2>{indoor}</h2>
          <p>Indoor Plants</p>
        </div>

        <div className="dash-card">
          <h2>{outdoor}</h2>
          <p>Outdoor Plants</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "25px 0",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Plant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <option>All</option>
          <option>Indoor</option>
          <option>Outdoor</option>
          <option>Flower</option>
        </select>
      </div>

      <h2 className="plant-title">🌿 My Plants</h2>

      <div className="plant-list">
        {filteredPlants.length === 0 ? (
          <h3>No Plants Found</h3>
        ) : (
          filteredPlants.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <h3>{plant.plant_name}</h3>

              <p>
                <strong>Type:</strong> {plant.plant_type}
              </p>

              <p>
                <strong>Watering:</strong>{" "}
                {plant.watering_frequency}
              </p>

              <div className="btn-group">
                <button
                  onClick={() =>
                    navigate(`/plant/${plant.id}`)
                  }
                >
                  View
                </button>

                <button
                  onClick={() =>
                    navigate(`/edit-plant/${plant.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(plant.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;