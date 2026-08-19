
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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

function Favourites() {
  const { isAuthenticated } = useAuth();

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    loadFavourites();
  }, [isAuthenticated]);

  const loadFavourites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/favourites");

      setFavourites(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load favourites:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load favourites."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (listingId) => {
    try {
      await api.delete(
        `/favourites/${listingId}`
      );

      setFavourites((current) =>
        current.filter(
          (item) =>
            item.listingId !== listingId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove favourite:",
        error
      );
    }
  };

  /* Not logged in */
  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <Heart
              size={34}
              className="text-slate-400"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-950">
            Your Favourites
          </h1>

          <p className="mt-3 max-w-md text-slate-500">
            Login to save cars you love and
            access them anytime.
          </p>

          <Link
            to="/login"
            className="mt-7 rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
          >
            Login to Continue
          </Link>

        </div>
      </main>
    );
  }

  /* Loading */
  if (loading) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <div className="aspect-16/10 animate-pulse bg-slate-200" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    );
  }

  /* Error */
  if (error) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">

          <h1 className="text-3xl font-black text-slate-950">
            Unable to load favourites
          </h1>

          <p className="mt-3 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadFavourites}
            className="mt-6 rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600"
          >
            Try Again
          </button>

        </div>
      </main>
    );
  }

  /* Empty */
  if (favourites.length === 0) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <Heart
              size={34}
              className="text-slate-300"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-950">
            No Favourite Cars Yet
          </h1>

          <p className="mt-3 max-w-md text-slate-500">
            Save cars you're interested in and
            they'll appear here.
          </p>

          <Link
            to="/cars"
            className="mt-7 rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
          >
            Browse Cars
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between gap-6">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
                Saved Cars
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                My Favourites
              </h1>

              <p className="mt-2 text-slate-500">
                {favourites.length}{" "}
                {favourites.length === 1
                  ? "car"
                  : "cars"}{" "}
                saved
              </p>
            </div>

            <Link
              to="/cars"
              className="hidden rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white sm:block"
            >
              Browse More Cars
            </Link>

          </div>

        </div>
      </section>

      {/* Cars */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {favourites.map((item) => {
            const car = item.listing;

            const image =
              car.images?.find(
                (img) => img.isPrimary
              )?.imageUrl ||
              car.images?.[0]?.imageUrl ||
              "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80";

            const imageUrl = image.startsWith("http")
              ? image
              : `${import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5001"}${image}`;

            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">

                  <img
                    src={imageUrl}
                    alt={`${car.model?.brand?.name || ""} ${car.model?.name || ""}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeFavourite(
                        item.listingId
                      )
                    }
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow transition hover:bg-red-50"
                    title="Remove from favourites"
                    aria-label="Remove from favourites"
                  >
                    <Heart
                      size={18}
                      fill="currentColor"
                    />
                  </button>

                </div>

                {/* Content */}
                <div className="p-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    {car.model?.brand?.name}
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    {car.model?.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {car.variant}
                  </p>

                  <p className="mt-4 text-2xl font-black text-slate-950">
                    {formatPrice(car.price)}
                  </p>

                  <div className="mt-5 flex gap-3">

                    <Link
                      to={`/cars/${car.id}`}
                      className="flex flex-1 items-center justify-center rounded-lg bg-slate-950 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeFavourite(
                          item.listingId
                        )
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      title="Remove"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>
    </main>
  );
}

export default Favourites;

