import React from "react";
import { Link } from "react-router-dom";
import "./DashboardCard.css";

function DashboardCard({ plant, onDelete }) {
  return (
    <div className="dashboard-card">
      <img
        src={plant.image_url}
        alt={plant.plant_name}
        className="plant-image"
      />

      <div className="card-content">
        <h3>{plant.plant_name}</h3>

        <p>
          <strong>Type:</strong> {plant.plant_type}
        </p>

        <p>
          <strong>Watering:</strong> {plant.watering_schedule}
        </p>

        <div className="card-buttons">
          <Link to={`/plant/${plant.id}`}>
            <button className="view-btn">View</button>
          </Link>

          <Link to={`/edit/${plant.id}`}>
            <button className="edit-btn">Edit</button>
          </Link>

          <button
            className="delete-btn"
            onClick={() => onDelete(plant.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;