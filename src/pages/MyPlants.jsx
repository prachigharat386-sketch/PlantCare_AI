import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function MyPlants() {

  const [plants, setPlants] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    fetchPlants();
  }, []);


  const fetchPlants = async () => {

    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .order("id", { ascending: false });


    if(error){
      console.log(error);
    }
    else{
      setPlants(data || []);
    }

  };


  const deletePlant = async (id) => {

    const { error } = await supabase
      .from("plants")
      .delete()
      .eq("id", id);


    if(error){
      console.log(error);
    }
    else{
      fetchPlants();
    }

  };



  return (

    <div style={{padding:"30px"}}>

      <h1>🌱 My Plants</h1>


      <div 
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px"
        }}
      >


      {
        plants.map((plant)=>(

          <div 
            key={plant.id}
            style={{
              border:"1px solid #ddd",
              padding:"15px",
              borderRadius:"10px"
            }}
          >


            {
              plant.image_url &&
              <img
                src={plant.image_url}
                alt={plant.plant_name}
                width="150"
                height="150"
                style={{objectFit:"cover"}}
              />
            }


            <h2>{plant.plant_name}</h2>

            <p>
              Type: {plant.plant_type}
            </p>

            <p>
              Watering: {plant.water_frequency || plant.watering_frequency}
            </p>



            <button
              onClick={()=>{
                navigate(`/plantdetails/${plant.id}`)
              }}
            >
              View
            </button>


            <button
              onClick={()=>{
                navigate(`/editplant/${plant.id}`)
              }}
              style={{marginLeft:"10px"}}
            >
              Edit
            </button>


            <button
              onClick={()=>deletePlant(plant.id)}
              style={{marginLeft:"10px"}}
            >
              Delete
            </button>


          </div>

        ))
      }


      </div>


    </div>

  );

}


export default MyPlants;