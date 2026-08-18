import CarCard from "./CarCard";

function CarGrid({ cars }) {
  if (!cars || cars.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
        <h3 className="text-lg font-bold text-slate-900">No cars found</h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarGrid;
