import { useEffect, useState } from "react";
import { ArrowLeft, Car, ImagePlus, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AdminCarForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);
  const [models, setModels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [existingImages, setExistingImages] = useState([]);

  const [form, setForm] = useState({
    modelId: "",
    variant: "",
    year: "",
    price: "",
    kmDriven: "",
    fuelType: "PETROL",
    transmission: "MANUAL",
    ownerCount: "",
    color: "",
    registrationCity: "",
    registrationNumber: "",
    engine: "",
    mileage: "",
    seatingCapacity: "5",
    description: "",
    features: [],
  });

  const [selectedBrand, setSelectedBrand] = useState("");

  const handleDeleteImage = async (imageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/admin/cars/images/${imageId}`);

      setExistingImages((current) =>
        current.filter((image) => image.id !== imageId),
      );
    } catch (err) {
      console.error("Error deleting image:", err);

      setError(err.response?.data?.message || "Failed to delete image.");
    }
  };

  /*
   * Load brands and features
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandsResponse, featuresResponse] = await Promise.all([
          api.get("/cars/brands"),
          api.get("/cars/features"),
        ]);

        setBrands(brandsResponse.data);
        setFeatures(featuresResponse.data);
      } catch (err) {
        console.error("Error loading brands/features:", err);

        setError(
          err.response?.data?.message || "Unable to load brands and features.",
        );
      }
    };

    loadData();
  }, []);

  /*
   * Load existing car when editing
   */
  useEffect(() => {
    if (!isEditMode) {
      setLoading(false);
      return;
    }

    const loadCar = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/cars/${id}`);

        const car = response.data;

        setExistingImages(car.images || []);

        setSelectedBrand(String(car.model?.brandId || ""));

        setForm({
          modelId: String(car.modelId || ""),
          variant: car.variant || "",
          year: car.year || "",
          price: car.price || "",
          kmDriven: car.kmDriven ?? "",
          fuelType: car.fuelType || "PETROL",
          transmission: car.transmission || "MANUAL",
          ownerCount: car.ownerCount ?? "",
          color: car.color || "",
          registrationCity: car.registrationCity || "",
          registrationNumber: car.registrationNumber || "",
          engine: car.engine || "",
          mileage: car.mileage || "",
          seatingCapacity: car.seatingCapacity || "5",
          description: car.description || "",
          features: car.features?.map((item) => item.featureId) || [],
        });
      } catch (err) {
        console.error("Error loading car:", err);

        setError(err.response?.data?.message || "Unable to load car.");
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id, isEditMode]);

  /*
   * Load models when brand changes
   */
  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);

      if (!isEditMode) {
        setForm((current) => ({
          ...current,
          modelId: "",
        }));
      }

      return;
    }

    const brand = brands.find(
      (item) => String(item.id) === String(selectedBrand),
    );

    setModels(brand?.models || []);

    /*
     * Don't clear model while loading edit data.
     */
    if (!isEditMode) {
      setForm((current) => ({
        ...current,
        modelId: "",
      }));
    }
  }, [selectedBrand, brands, isEditMode]);

  /*
   * Handle normal inputs
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * Handle features
   */
  const handleFeatureChange = (featureId) => {
    setForm((current) => {
      const exists = current.features.includes(featureId);

      return {
        ...current,
        features: exists
          ? current.features.filter((id) => id !== featureId)
          : [...current.features, featureId],
      };
    });
  };

  /*
   * Handle image selection
   */
  const handleImages = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    setSelectedFiles(files);
    setError("");
  };

  /*
   * Remove newly selected image
   */
  const removeImage = (index) => {
    setSelectedFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  /*
   * Submit
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const data = new FormData();

      data.append("modelId", form.modelId);

      data.append("variant", form.variant);

      data.append("year", form.year);

      data.append("price", form.price);

      data.append("kmDriven", form.kmDriven);

      data.append("fuelType", form.fuelType);

      data.append("transmission", form.transmission);

      if (form.ownerCount) {
        data.append("ownerCount", form.ownerCount);
      }

      if (form.color) {
        data.append("color", form.color);
      }

      if (form.registrationCity) {
        data.append("registrationCity", form.registrationCity);
      }

      if (form.registrationNumber) {
        data.append("registrationNumber", form.registrationNumber);
      }

      if (form.engine) {
        data.append("engine", form.engine);
      }

      if (form.mileage) {
        data.append("mileage", form.mileage);
      }

      if (form.seatingCapacity) {
        data.append("seatingCapacity", form.seatingCapacity);
      }

      if (form.description) {
        data.append("description", form.description);
      }

      /*
       * Features
       */
      form.features.forEach((featureId) => {
        data.append("features", featureId);
      });

      /*
       * New images
       */
      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      /*
       * CREATE
       */
      if (!isEditMode) {
        await api.post("/admin/cars", data);
      } else {

      /*
       * UPDATE
       */
        await api.put(`/admin/cars/${id}`, data);
      }

      navigate("/admin/cars");
    } catch (err) {
      console.error("Error saving car:", err);

      setError(err.response?.data?.message || "Unable to save car.");
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-slate-500">Loading...</p>
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
            to="/admin/cars"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Cars
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <div className="rounded-xl bg-amber-500 p-3 text-slate-950">
              <Car size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
                Administration
              </p>

              <h1 className="text-3xl font-black text-white">
                {isEditMode ? "Edit Car" : "Add New Car"}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BASIC INFORMATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Brand */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Brand *
                </label>

                <select
                  value={selectedBrand}
                  onChange={(event) => setSelectedBrand(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                  required
                >
                  <option value="">Select brand</option>

                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Model *
                </label>

                <select
                  name="modelId"
                  value={form.modelId}
                  onChange={handleChange}
                  disabled={!selectedBrand}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none disabled:bg-slate-100 focus:border-amber-500"
                  required
                >
                  <option value="">Select model</option>

                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Variant */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Variant *
                </label>

                <input
                  name="variant"
                  value={form.variant}
                  onChange={handleChange}
                  placeholder="e.g. SX Turbo"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Year *
                </label>

                <input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2024"
                  min="1990"
                  max="2030"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price (₹) *
                </label>

                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="1250000"
                  min="0"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                  required
                />
              </div>

              {/* KM */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  KM Driven *
                </label>

                <input
                  name="kmDriven"
                  type="number"
                  value={form.kmDriven}
                  onChange={handleChange}
                  placeholder="25000"
                  min="0"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* MECHANICAL DETAILS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              Mechanical Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Fuel */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fuel Type *
                </label>

                <select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option value="PETROL">Petrol</option>

                  <option value="DIESEL">Diesel</option>

                  <option value="CNG">CNG</option>

                  <option value="ELECTRIC">Electric</option>

                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Transmission *
                </label>

                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option value="MANUAL">Manual</option>

                  <option value="AUTOMATIC">Automatic</option>

                  <option value="AMT">AMT</option>

                  <option value="CVT">CVT</option>

                  <option value="DCT">DCT</option>
                </select>
              </div>

              {/* Engine */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Engine
                </label>

                <input
                  name="engine"
                  value={form.engine}
                  onChange={handleChange}
                  placeholder="1.5L Turbo"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mileage
                </label>

                <input
                  name="mileage"
                  value={form.mileage}
                  onChange={handleChange}
                  placeholder="18 km/l"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              {/* Owners */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Owner Count
                </label>

                <input
                  name="ownerCount"
                  type="number"
                  value={form.ownerCount}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              {/* Seating */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Seating Capacity
                </label>

                <input
                  name="seatingCapacity"
                  type="number"
                  value={form.seatingCapacity}
                  onChange={handleChange}
                  min="1"
                  max="15"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* REGISTRATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              Registration Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Color */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Color
                </label>

                <input
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="White"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Registration City
                </label>

                <input
                  name="registrationCity"
                  value={form.registrationCity}
                  onChange={handleChange}
                  placeholder="Pune"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              {/* Registration number */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Registration Number
                </label>

                <input
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  placeholder="MH12AB1234"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Features</h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {features.map((feature) => (
                <label
                  key={feature.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-amber-400"
                >
                  <input
                    type="checkbox"
                    checked={form.features.includes(feature.id)}
                    onChange={() => handleFeatureChange(feature.id)}
                    className="h-4 w-4 accent-amber-500"
                  />

                  <span className="text-sm text-slate-700">{feature.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Description</h2>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the car..."
              className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
            />
          </div>

          {/* IMAGES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Car Images
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage existing images or upload additional ones.
                </p>
              </div>

              <ImagePlus size={24} className="text-amber-500" />
            </div>

            {/* EXISTING IMAGES */}
            {isEditMode && existingImages.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-bold text-slate-700">
                  Existing Images
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {existingImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200"
                    >
                      <img
                        src={
                          image.imageUrl.startsWith("http")
                            ? image.imageUrl
                            : `${import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5001"}${image.imageUrl}`
                        }
                        alt="Car"
                        className="aspect-square w-full object-cover"
                      />

                      {/* Primary badge */}
                      {image.isPrimary && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-slate-950 px-2 py-1 text-[10px] font-bold text-white">
                          PRIMARY
                        </span>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-700 opacity-0 shadow transition group-hover:opacity-100 hover:text-red-500"
                        title="Delete image"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UPLOAD */}
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-amber-500">
              <ImagePlus size={32} className="text-slate-400" />

              <span className="mt-3 font-semibold text-slate-700">
                Upload Additional Images
              </span>

              <span className="mt-1 text-xs text-slate-400">
                JPG, PNG or WebP
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImages}
                className="hidden"
              />
            </label>

            {/* NEW IMAGES */}
            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-bold text-slate-700">
                  New Images
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-slate-200"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="aspect-square w-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-slate-950 px-2 py-1 text-[10px] font-bold text-white">
                          NEW PRIMARY
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-700 shadow hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/admin/cars"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? isEditMode
                  ? "Saving Changes..."
                  : "Adding Car..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Car"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AdminCarForm;
