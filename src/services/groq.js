export async function getPlantCareTips(plantName, plantType) {
  const name = plantName.toLowerCase();

  if (name.includes("rose")) {
    return `
🌹 Rose Care Tips

💧 Water every 2-3 days.
☀️ Keep in 6 hours of sunlight.
🌱 Use well-drained soil.
🌡️ Best temperature: 15°C - 28°C.
🌼 Add fertilizer once every 2 weeks.
`;
  }

  if (name.includes("hibiscus")) {
    return `
🌺 Hibiscus Care Tips

💧 Water daily.
☀️ Keep in full sunlight.
🌱 Use fertile and moist soil.
🌡️ Best temperature: 20°C - 35°C.
🌼 Add fertilizer every 15 days.
`;
  }

  if (name.includes("money")) {
    return `
🌿 Money Plant Care Tips

💧 Water once a week.
☀️ Keep in indirect sunlight.
🌱 Use light, well-drained soil.
🌡️ Best temperature: 18°C - 30°C.
🌼 Fertilize once a month.
`;
  }

  return `
🌱 General Plant Care Tips

💧 Water regularly but avoid overwatering.
☀️ Keep the plant in suitable sunlight.
🌱 Use nutrient-rich soil.
🌡️ Maintain a moderate temperature.
🌼 Add organic fertilizer every month.
`;
}