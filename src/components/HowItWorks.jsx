function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add Your Plant",
      description: "Register your plant with its details and photo.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Groq AI & Vision analyze your plant health.",
    },
    {
      number: "03",
      title: "Get Care Tips",
      description: "Receive personalized care suggestions and reminders.",
    },
  ];

  return (
    <section id="about" className="py-16 bg-green-50">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 px-10">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <h1 className="text-5xl font-bold text-green-600">
              {step.number}
            </h1>

            <h3 className="text-2xl font-semibold mt-4">
              {step.title}
            </h3>

            <p className="text-gray-600 mt-3">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;