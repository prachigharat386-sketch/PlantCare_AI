function Features() {
  const features = [
    {
      title: "AI Plant Care",
      description: "Get smart plant care suggestions using Groq AI.",
    },
    {
      title: "Plant Health Scan",
      description: "Analyze plant images using Groq Vision.",
    },
    {
      title: "Water Reminders",
      description: "Receive email reminders with Resend.",
    },
    {
      title: "Dashboard",
      description: "Track all your plants with beautiful charts.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
        Our Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg border hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-green-600">
              {feature.title}
            </h3>
            <p className="mt-3 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;