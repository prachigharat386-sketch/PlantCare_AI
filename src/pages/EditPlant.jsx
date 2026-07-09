import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");

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
      console.log(error);
      alert("Plant not found");
      navigate("/plants");
      return;
    }

    setPlantName(data.plant_name);
    setPlantType(data.plant_type);
    setWateringFrequency(data.watering_frequency);
  }

  async function updatePlant(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const { error } = await supabase
      .from("plants")
      .update({
        plant_name: plantName,
        plant_type: plantType,
        watering_frequency: wateringFrequency,
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      alert("🌱 Plant Updated Successfully!");
      navigate("/plants");
    }
  }

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
        🌱 Edit Plant
      </h1>

      <form onSubmit={updatePlant}>
        <label>Plant Name</label>
        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Plant Type</label>
        <input
          type="text"
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Watering Frequency</label>
        <input
          type="text"
          value={wateringFrequency}
          onChange={(e) => setWateringFrequency(e.target.value)}
          required
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
          Update Plant
        </button>
      </form>
    </div>
  );
}

export default EditPlant;