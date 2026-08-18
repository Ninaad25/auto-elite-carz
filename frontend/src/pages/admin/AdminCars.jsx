import { useEffect, useState } from "react";
import { ArrowLeft, Car, Trash2, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function formatPrice(price) {
  const number = Number(price);

  if (number >= 10000000) {
    return `₹${(number / 10000000).toFixed(2)} Cr`;
  }

  if (number >= 100000) {
    return `₹${(number / 100000).toFixed(2)} Lakh`;
  }

  return `₹${number.toLocaleString("en-IN")}`;
}

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCars = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/cars");

      setCars(response.data);
      setError("");
    } catch (err) {
      console.error("Error loading admin cars:", err);

      setError(err.response?.data?.message || "Unable to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const updateStatus = async (carId, status) => {
    try {
      await api.patch(`/admin/cars/${carId}/status`, {
        status,
      });

      setCars((currentCars) =>
        currentCars.map((car) => (car.id === carId ? { ...car, status } : car)),
      );
    } catch (err) {
      console.error("Error updating status:", err);

      alert(err.response?.data?.message || "Unable to update car status.");
    }
  };

  const deleteCar = async (carId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this car?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/admin/cars/${carId}`);

      setCars((currentCars) => currentCars.filter((car) => car.id !== carId));
    } catch (err) {
      console.error("Error deleting car:", err);

      alert(err.response?.data?.message || "Unable to delete car.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-slate-500">Loading cars...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <div className="rounded-xl bg-amber-500 p-3 text-slate-950">
              <Car size={24} />
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
                  Administration
                </p>

                <h1 className="text-3xl font-black text-white">Manage Cars</h1>
              </div>

              <Link
                to="/admin/cars/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
              >
                <Plus size={18} />
                Add New Car
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {cars.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Car size={40} className="mx-auto text-slate-300" />

            <h2 className="mt-4 font-bold text-slate-900">No cars found</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your catalogue is currently empty.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Car
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Year
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {cars.map((car) => {
                    const brand = car.model?.brand?.name || "";

                    const model = car.model?.name || "";

                    const image =
                      car.images?.find((img) => img.isPrimary)?.imageUrl ||
                      car.images?.[0]?.imageUrl ||
                      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=400&q=80";

                    return (
                      <tr key={car.id} className="transition hover:bg-slate-50">
                        {/* Car */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                image.startsWith("/")
                                  ? `http://localhost:5001${image}`
                                  : image
                              }
                              alt={`${brand} ${model}`}
                              className="h-16 w-24 rounded-lg object-cover"
                            />

                            <div>
                              <p className="font-bold text-slate-950">
                                {brand} {model}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {car.variant}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                ID #{car.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-950">
                            {formatPrice(car.price)}
                          </p>
                        </td>

                        {/* Year */}
                        <td className="px-6 py-5">
                          <p className="text-sm text-slate-700">{car.year}</p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <select
                            value={car.status}
                            onChange={(e) =>
                              updateStatus(car.id, e.target.value)
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-amber-500"
                          >
                            <option value="AVAILABLE">Available</option>

                            <option value="RESERVED">Reserved</option>

                            <option value="SOLD">Sold</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/cars/${car.id}/edit`}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                              title="Edit car"
                            >
                              <Pencil size={18} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => deleteCar(car.id)}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete car"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminCars;
