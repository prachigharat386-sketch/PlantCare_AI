function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700">
        What Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8 px-10 mt-10">

        <div className="shadow-lg rounded-xl p-6">
          <h3 className="font-bold text-xl">Prachi</h3>
          <p className="mt-3 text-gray-600">
            PlantCare AI helped me keep my plants healthy.
          </p>
        </div>

        <div className="shadow-lg rounded-xl p-6">
          <h3 className="font-bold text-xl">Bhumi</h3>
          <p className="mt-3 text-gray-600">
            AI suggestions are simple and very useful.
          </p>
        </div>

        <div className="shadow-lg rounded-xl p-6">
          <h3 className="font-bold text-xl">Krupa</h3>
          <p className="mt-3 text-gray-600">
            The reminders never let me forget watering my plants.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;