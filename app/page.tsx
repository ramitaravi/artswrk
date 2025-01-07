export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Our Site</h1>
        <p className="text-xl text-gray-600">
          Add your compelling introduction or call to action here.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Add feature cards here */}
        </div>
      </section>
    </div>
  );
} 