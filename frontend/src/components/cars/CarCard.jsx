import { Link } from "react-router-dom";
import { Heart, Gauge, Fuel, Settings2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

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

function CarCard({ car }) {
  const { isAuthenticated } = useAuth();

  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);

  const image =
    car.images?.find((img) => img.isPrimary)?.imageUrl ||
    car.images?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80";

  /*
   * Check whether this car is already favourited
   */
  useEffect(() => {
    if (!isAuthenticated || !car?.id) {
      setIsFavourite(false);
      return;
    }

    const checkFavourite = async () => {
      try {
        const response = await api.get(`/favourites/${car.id}`);

        setIsFavourite(response.data.isFavourite);
      } catch (error) {
        console.error("Failed to check favourite:", error);
      }
    };

    checkFavourite();
  }, [isAuthenticated, car?.id]);

  /*
   * Add / remove favourite
   */
  const handleFavourite = async (event) => {
    // VERY IMPORTANT:
    // Prevent the parent <Link> from opening
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (favouriteLoading) {
      return;
    }

    try {
      setFavouriteLoading(true);

      if (isFavourite) {
        await api.delete(`/favourites/${car.id}`);

        setIsFavourite(false);
      } else {
        await api.post(`/favourites/${car.id}`);

        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Favourite request failed:", error);

      console.error("Server response:", error.response?.data);

      console.error("Status:", error.response?.status);
    } finally {
      setFavouriteLoading(false);
    }
  };

  return (
    <Link
      to={`/cars/${car.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={`${car.model?.brand?.name || ""} ${car.model?.name || ""}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-600 shadow">
            {car.status || "AVAILABLE"}
          </span>
        </div>

        {/* Favourite */}
        <button
          type="button"
          onClick={handleFavourite}
          disabled={favouriteLoading}
          className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md transition ${
            isFavourite ? "text-red-500" : "text-slate-700 hover:text-red-500"
          } ${
            favouriteLoading
              ? "cursor-not-allowed opacity-60"
              : "hover:scale-105"
          }`}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          <Heart
            size={19}
            strokeWidth={2}
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-600">
          {car.model?.brand?.name}
        </div>

        <h3 className="text-xl font-bold text-slate-950">{car.model?.name}</h3>

        <p className="mt-1 text-sm text-slate-500">{car.variant}</p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-black text-slate-950">
            {formatPrice(car.price)}
          </span>
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Gauge size={16} className="text-slate-400" />
            {Number(car.kmDriven).toLocaleString("en-IN")} km
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Fuel size={16} className="text-slate-400" />
            {car.fuelType}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Settings2 size={16} className="text-slate-400" />
            {car.transmission}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} className="text-slate-400" />
            {car.registrationCity || "India"}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 flex w-full items-center justify-center rounded-xl bg-slate-950 py-3 text-sm font-bold text-white transition group-hover:bg-amber-600">
          View Details
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
