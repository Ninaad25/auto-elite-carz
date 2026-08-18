import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CarGrid from "../components/cars/CarGrid";
import CarFilters from "../components/cars/CarFilters";
import { getCars } from "../services/api";

const initialFilters = {
  brands: [],
  fuelTypes: [],
  transmissions: [],
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
};

function Cars() {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const [sort, setSort] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);


  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);

        const data = await getCars();

        console.log("API DATA:", data);

        setCars(Array.isArray(data) ? data : data.cars || []);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load cars. Please make sure the backend is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  /*
   * Build brand list dynamically from the database.
   */
  const brands = useMemo(() => {
    const uniqueBrands = new Set();

    cars.forEach((car) => {
      const brand = car.model?.brand?.name;

      if (brand) {
        uniqueBrands.add(brand);
      }
    });

    return [...uniqueBrands].sort();
  }, [cars]);

  /*
   * Apply search + filters + sorting.
   */
  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = cars.filter((car) => {
      // Create one searchable string from the complete car object
      const searchableText = JSON.stringify(car).toLowerCase();

      // Search
      const matchesSearch = query === "" || searchableText.includes(query);

      // Brand
      const brand = car?.model?.brand?.name || "";

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(brand);

      // Fuel
      const matchesFuel =
        filters.fuelTypes.length === 0 ||
        filters.fuelTypes.includes(car?.fuelType);

      // Transmission
      const matchesTransmission =
        filters.transmissions.length === 0 ||
        filters.transmissions.includes(car?.transmission);

      // Price
      const price = Number(car?.price || 0);

      const matchesMinPrice =
        !filters.minPrice || price >= Number(filters.minPrice);

      const matchesMaxPrice =
        !filters.maxPrice || price <= Number(filters.maxPrice);

      // Year
      const year = Number(car?.year || 0);

      const matchesMinYear =
        !filters.minYear || year >= Number(filters.minYear);

      const matchesMaxYear =
        !filters.maxYear || year <= Number(filters.maxYear);

      return (
        matchesSearch &&
        matchesBrand &&
        matchesFuel &&
        matchesTransmission &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinYear &&
        matchesMaxYear
      );
    });

    // Sorting
    result.sort((a, b) => {
      if (sort === "price-low") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "price-high") {
        return Number(b.price) - Number(a.price);
      }

      if (sort === "oldest") {
        return Number(a.year) - Number(b.year);
      }

      // newest
      return Number(b.year) - Number(a.year);
    });

    return result;
  }, [cars, search, filters, sort]);

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
            Auto Elite Carz
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">
                Browse Cars
              </h1>

              <p className="mt-3 text-slate-500">
                Find your next car from our carefully selected collection.
              </p>
            </div>

            <div className="text-sm text-slate-500">
              <span className="font-bold text-slate-950">
                {filteredCars.length}
              </span>{" "}
              cars available
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden w-64 shrink-0 lg:block">
            <CarFilters
              brands={brands}
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
            />
          </div>

          {/* Main */}
          <div className="min-w-0 flex-1">
            {/* Search / Sort */}
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
                <Search size={19} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brand, model or variant..."
                  className="w-full py-3 text-sm outline-none"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-400 hover:text-slate-900"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {/* Mobile Filters */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              {/* Sort */}
              <div className="relative flex items-center">
                <ArrowUpDown
                  size={17}
                  className="pointer-events-none absolute left-3 text-slate-400"
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 text-sm font-medium outline-none sm:w-52"
                >
                  <option value="newest">Newest First</option>

                  <option value="oldest">Oldest First</option>

                  <option value="price-low">Price: Low to High</option>

                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {(filters.brands.length > 0 ||
              filters.fuelTypes.length > 0 ||
              filters.transmissions.length > 0 ||
              filters.minPrice ||
              filters.maxPrice ||
              filters.minYear ||
              filters.maxYear) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Active filters:
                </span>

                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="py-24 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />

                <p className="mt-4 text-sm text-slate-500">Loading cars...</p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <h3 className="font-bold text-red-800">
                  Unable to load catalogue
                </h3>

                <p className="mt-2 text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Cars */}
            {!loading && !error && <CarGrid cars={filteredCars} />}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <CarFilters
            mobile
            brands={brands}
            filters={filters}
            setFilters={setFilters}
            onClear={clearFilters}
            onClose={() => setMobileFiltersOpen(false)}
          />
        </>
      )}
    </main>
  );
}

export default Cars;
