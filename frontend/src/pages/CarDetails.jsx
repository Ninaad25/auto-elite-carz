import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  MapPin,
  Users,
  Heart,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

import api from "../services/api";

function CarDetails() {
  const { id } = useParams();
 const { user, isAuthenticated } = useAuth();

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState("");
  const [enquiryError, setEnquiryError] = useState("");

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/cars/${id}`);

        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Unable to load this car.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !id) {
      setIsFavourite(false);
      return;
    }

    const checkFavourite = async () => {
      try {
        const response = await api.get(`/favourites/${id}`);

        setIsFavourite(response.data.isFavourite);
      } catch (error) {
        console.error("Failed to check favourite:", error);
      }
    };

    checkFavourite();
  }, [isAuthenticated, id]);

  const handleFavourite = async (event) => {
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
        await api.delete(`/favourites/${id}`);

        setIsFavourite(false);
      } else {
        await api.post(`/favourites/${id}`);

        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Favourite request failed:", error);

      console.error("Server response:", error.response?.data);
    } finally {
      setFavouriteLoading(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    setEnquiryError("");
    setEnquirySuccess("");

    if (!user) {
      setEnquiryError("Please login to enquire about this car.");
      return;
    }

    if (!enquiryMessage.trim()) {
      setEnquiryError("Please enter a message.");
      return;
    }

    try {
      setEnquiryLoading(true);

      await api.post("/enquiries", {
        listingId: Number(id),
        message: enquiryMessage.trim(),
      });

      setEnquirySuccess(
        "Your enquiry has been submitted successfully. We'll contact you soon.",
      );

      setEnquiryMessage("");
    } catch (err) {
      console.error("Error submitting enquiry:", err);

      setEnquiryError(
        err.response?.data?.message ||
          "Unable to submit your enquiry. Please try again.",
      );
    } finally {
      setEnquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Loading car details...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-slate-900">Car not found</h2>

        <p className="mt-2 text-slate-500">
          This vehicle may no longer be available.
        </p>

        <Link
          to="/cars"
          className="mt-6 rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          Browse Cars
        </Link>
      </div>
    );
  }

  const brand = car.model?.brand?.name || "";
  const model = car.model?.name || "";

  const title = `${brand} ${model}`;

  const price = Number(car.price || 0);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  const primaryImage =
    car.images?.find((image) => image.isPrimary)?.imageUrl ||
    car.images?.[0]?.imageUrl ||
    null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main section */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <CarImageGallery images={car.images} title={title} />
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-amber-600">
                  {car.year}
                </p>

                <h1 className="mt-1 text-3xl font-black text-slate-950">
                  {title}
                </h1>

                <p className="mt-1 text-slate-500">{car.variant}</p>
              </div>

              <button
                type="button"
                onClick={handleFavourite}
                disabled={favouriteLoading}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
                  isFavourite
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500"
                } ${favouriteLoading ? "cursor-not-allowed opacity-60" : ""}`}
                aria-label={
                  isFavourite ? "Remove from favourites" : "Add to favourites"
                }
              >
                <Heart size={21} fill={isFavourite ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Price</p>

              <p className="mt-1 text-3xl font-black text-slate-950">
                {formattedPrice}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <DetailItem
                icon={<Gauge size={18} />}
                label="KM Driven"
                value={`${Number(car.kmDriven).toLocaleString("en-IN")} km`}
              />

              <DetailItem
                icon={<Fuel size={18} />}
                label="Fuel"
                value={car.fuelType}
              />

              <DetailItem
                icon={<Settings2 size={18} />}
                label="Transmission"
                value={car.transmission}
              />

              <DetailItem
                icon={<Calendar size={18} />}
                label="Year"
                value={car.year}
              />
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={17} />
              {car.registrationCity || "Registration city not available"}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowEnquiryForm((current) => !current);
                setEnquiryError("");
                setEnquirySuccess("");
              }}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:bg-amber-600"
            >
              <Phone size={18} />
              Enquire About This Car
            </button>
            {showEnquiryForm && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
                {!user ? (
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">
                      Login required
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Please login to enquire about this car.
                    </p>

                    <Link
                      to="/login"
                      className="mt-4 inline-flex rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600"
                    >
                      Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit}>
                    <h3 className="font-bold text-slate-950">
                      Enquire about this car
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Ask us anything about this vehicle.
                    </p>

                    <textarea
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      placeholder={`I'm interested in the ${title} ${car.variant}. Please contact me.`}
                      rows={4}
                      className="mt-4 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />

                    {enquiryError && (
                      <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                        {enquiryError}
                      </p>
                    )}

                    {enquirySuccess && (
                      <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
                        {enquirySuccess}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={enquiryLoading}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {enquiryLoading ? "Sending..." : "Send Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-950">Car Details</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Specification label="Engine" value={car.engine} />
            <Specification label="Mileage" value={car.mileage} />
            <Specification
              label="Seating Capacity"
              value={
                car.seatingCapacity ? `${car.seatingCapacity} Seats` : null
              }
            />
            <Specification
              label="Previous Owners"
              value={
                car.ownerCount
                  ? `${car.ownerCount} Owner${car.ownerCount > 1 ? "s" : ""}`
                  : null
              }
            />
            <Specification label="Colour" value={car.color} />
            <Specification
              label="Registration"
              value={car.registrationNumber || "Available on request"}
            />
            <Specification label="Fuel Type" value={car.fuelType} />
            <Specification label="Transmission" value={car.transmission} />
          </div>
        </section>

        {/* Features */}
        {car.features?.length > 0 && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Features</h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {car.features.map((item) => (
                <div
                  key={`${item.listingId}-${item.featureId}`}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <CheckCircle2 size={19} className="shrink-0 text-amber-500" />

                  <span className="font-medium text-slate-700">
                    {item.feature?.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        {car.description && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Description</h2>

            <p className="mt-4 max-w-4xl leading-7 text-slate-600">
              {car.description}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Specification({ label, value }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || "Not specified"}
      </p>
    </div>
  );
}

function CarImageGallery({ images = [], title }) {
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;

    return (a.sortOrder || 0) - (b.sortOrder || 0);
  });

  const fallbackImage =
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80";

  const galleryImages =
    sortedImages.length > 0
      ? sortedImages
      : [
          {
            id: "fallback",
            imageUrl: fallbackImage,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = galleryImages[activeIndex];

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div>
      {/* Main Image */}
      <div className="group relative aspect-16/10 overflow-hidden bg-slate-100 sm:aspect-video">
        <img
          src={activeImage.imageUrl}
          alt={`${title} - image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Image counter */}
        {galleryImages.length > 1 && (
          <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
            {activeIndex + 1} / {galleryImages.length}
          </div>
        )}

        {/* Previous */}
        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
            aria-label="Previous image"
          >
            ←
          </button>
        )}

        {/* Next */}
        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
            aria-label="Next image"
          >
            →
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 ${
                index === activeIndex
                  ? "border-amber-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={image.imageUrl}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarDetails;
