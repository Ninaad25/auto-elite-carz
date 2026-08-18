import { RotateCcw, X } from "lucide-react";

const fuelTypes = ["PETROL", "DIESEL", "CNG", "ELECTRIC", "HYBRID"];

const transmissions = ["MANUAL", "AUTOMATIC", "AMT", "CVT", "DCT"];

function CarFilters({
  brands,
  filters,
  setFilters,
  onClear,
  mobile = false,
  onClose,
}) {
  const toggleValue = (field, value) => {
    setFilters((current) => {
      const values = current[field];

      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  };

  return (
    <aside
      className={
        mobile
          ? "fixed inset-y-0 left-0 z-60 w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl"
          : "rounded-2xl border border-slate-200 bg-white p-6"
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Filters</h2>

          <p className="mt-1 text-xs text-slate-500">Narrow down your search</p>
        </div>

        {mobile ? (
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        ) : null}
      </div>

      {/* Brand */}
      <div className="border-b border-slate-200 py-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Brand</h3>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleValue("brands", brand)}
                className="h-4 w-4 rounded border-slate-300 accent-amber-500"
              />

              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div className="border-b border-slate-200 py-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Fuel Type</h3>

        <div className="space-y-3">
          {fuelTypes.map((fuel) => (
            <label
              key={fuel}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.fuelTypes.includes(fuel)}
                onChange={() => toggleValue("fuelTypes", fuel)}
                className="h-4 w-4 rounded border-slate-300 accent-amber-500"
              />

              {fuel}
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="border-b border-slate-200 py-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Transmission</h3>

        <div className="space-y-3">
          {transmissions.map((transmission) => (
            <label
              key={transmission}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.transmissions.includes(transmission)}
                onChange={() => toggleValue("transmissions", transmission)}
                className="h-4 w-4 rounded border-slate-300 accent-amber-500"
              />

              {transmission}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-slate-200 py-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Price Range</h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Minimum</label>

            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((current) => ({
                  ...current,
                  minPrice: e.target.value,
                }))
              }
              placeholder="₹0"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-500">Maximum</label>

            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((current) => ({
                  ...current,
                  maxPrice: e.target.value,
                }))
              }
              placeholder="₹50L"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Year */}
      <div className="border-b border-slate-200 py-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">
          Registration Year
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={filters.minYear}
            onChange={(e) =>
              setFilters((current) => ({
                ...current,
                minYear: e.target.value,
              }))
            }
            placeholder="From"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-500"
          />

          <input
            type="number"
            value={filters.maxYear}
            onChange={(e) =>
              setFilters((current) => ({
                ...current,
                maxYear: e.target.value,
              }))
            }
            placeholder="To"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={onClear}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
      >
        <RotateCcw size={16} />
        Clear Filters
      </button>
    </aside>
  );
}

export default CarFilters;
