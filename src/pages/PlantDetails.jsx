import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getPlantCareTips } from "../services/groq";

function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tips, setTips] = useState("");
  const [tipsLoading, setTipsLoading] = useState(false);

  useEffect(() => {
    fetchPlant();
  }, []);

  async function fetchPlant() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      alert("Plant not found");
      navigate("/plants");
    } else {
      setPlant(data);
    }

    setLoading(false);
  }

  async function handleAITips() {
  setTipsLoading(true);

  try {
    const result = await getPlantCareTips(
      plant.plant_name,
      plant.plant_type
    );

    setTips(result);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

  setTipsLoading(false);
}
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!plant) {
    return <h2 style={{ textAlign: "center" }}>Plant Not Found</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "green" }}>
        🌱 Plant Details
      </h1>

      {plant.image_url && (
        <img
          src={plant.image_url}
          alt={plant.plant_name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}

      <p>
        <strong>🌿 Plant Name:</strong> {plant.plant_name}
      </p>

      <p>
        <strong>🪴 Plant Type:</strong> {plant.plant_type}
      </p>

      <p>
        <strong>💧 Watering Frequency:</strong>{" "}
        {plant.watering_frequency}
      </p>

      <p>
        <strong>📅 Last Watered:</strong>{" "}
        {plant.last_watered || "Not Available"}
      </p>

      <p>
        <strong>🕒 Added On:</strong>{" "}
        {new Date(plant.created_at).toLocaleDateString()}
      </p>

      <br />

      <button
        onClick={handleAITips}
        disabled={tipsLoading}
        style={{
          padding: "10px 20px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {tipsLoading ? "Loading AI..." : "🤖 Get AI Tips"}
      </button>

      <button
        onClick={() => navigate("/plants")}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {tips && (
        <div
          style={{
            marginTop: "25px",
            background: "#f0fff4",
            padding: "20px",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>🤖 AI Plant Care Tips</h2>
          <p>{tips}</p>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;