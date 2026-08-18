import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function AddCar() {
  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [images, setImages] = useState([]);

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
    seatingCapacity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandsResponse, featuresResponse] = await Promise.all([
          api.get("/admin/brands"),
          api.get("/admin/features"),
        ]);

        setBrands(brandsResponse.data);
        setFeatures(featuresResponse.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data.");
      }
    };

    loadData();
  }, []);

  const selectedBrandData = brands.find(
    (brand) => brand.id === Number(selectedBrand),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);

    setForm((current) => ({
      ...current,
      modelId: "",
    }));
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures((current) =>
      current.includes(featureId)
        ? current.filter((id) => id !== featureId)
        : [...current, featureId],
    );
  };

const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files || []);

  if (selectedFiles.length > 10) {
    setError("You can upload a maximum of 10 images.");
    return;
  }

  setError("");
  setImages(selectedFiles);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      selectedFeatures.forEach((featureId) => {
        formData.append("features", String(featureId));
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.post("/admin/cars", formData);

      setMessage(response.data.message);

      setForm({
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
        seatingCapacity: "",
        description: "",
      });

      setSelectedBrand("");
      setSelectedFeatures([]);
      setImages([]);
    } catch (err) {
      console.error("Add car error:", err);

      setError(err.response?.data?.message || "Failed to add car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-black text-slate-950">Add New Car</h1>

          <p className="mt-2 text-slate-500">
            Add a vehicle to the Auto Elite Carz catalogue.
          </p>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Brand">
                <select
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  required
                >
                  <option value="">Select brand</option>

                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Model">
                <select
                  name="modelId"
                  value={form.modelId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  required
                  disabled={!selectedBrandData}
                >
                  <option value="">Select model</option>

                  {selectedBrandData?.models?.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Variant">
                <input
                  name="variant"
                  value={form.variant}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="SX Turbo"
                  required
                />
              </Field>

              <Field label="Year">
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="2023"
                  required
                />
              </Field>
            </div>
          </section>

          {/* Pricing & Running */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950">
              Pricing & Running
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Price">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="1325000"
                  required
                />
              </Field>

              <Field label="KM Driven">
                <input
                  type="number"
                  name="kmDriven"
                  value={form.kmDriven}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="18000"
                  required
                />
              </Field>

              <Field label="Fuel Type">
                <select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="CNG">CNG</option>
                  <option value="ELECTRIC">Electric</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </Field>

              <Field label="Transmission">
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="MANUAL">Manual</option>
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="AMT">AMT</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
                </select>
              </Field>
            </div>
          </section>

          {/* Specifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950">
              Specifications
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Owner Count">
                <input
                  type="number"
                  name="ownerCount"
                  value={form.ownerCount}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </Field>

              <Field label="Colour">
                <input
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </Field>

              <Field label="Registration City">
                <input
                  name="registrationCity"
                  value={form.registrationCity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </Field>

              <Field label="Registration Number">
                <input
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </Field>

              <Field label="Engine">
                <input
                  name="engine"
                  value={form.engine}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="1.5L Turbo"
                />
              </Field>

              <Field label="Mileage">
                <input
                  name="mileage"
                  value={form.mileage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="18.5 km/l"
                />
              </Field>

              <Field label="Seating Capacity">
                <input
                  type="number"
                  name="seatingCapacity"
                  value={form.seatingCapacity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="5"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Description">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  placeholder="Describe the vehicle..."
                />
              </Field>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <h2 className="text-xl font-black text-slate-950">Car Images</h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload up to 10 images. The first image will be the primary
                image.
              </p>
            </div>

            <div className="mt-6">
              <label
                htmlFor="car-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-amber-400 hover:bg-amber-50"
              >
                <div className="text-4xl">📸</div>

                <p className="mt-3 font-bold text-slate-900">
                  Select car images
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  JPG, PNG or WebP · Maximum 10 images
                </p>

                <input
                  id="car-images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="aspect-square w-full object-cover"
                    />

                    <div className="p-2">
                      <p className="truncate text-xs font-medium text-slate-700">
                        {file.name}
                      </p>

                      {index === 0 && (
                        <span className="mt-1 inline-block text-xs font-bold text-amber-600">
                          Primary Image
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Features */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950">Features</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <label
                  key={feature.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => toggleFeature(feature.id)}
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {feature.name}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-amber-500 px-8 py-3.5 font-black text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding Car..." : "Add Car to Catalogue"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {children}
    </div>
  );
}

export default AddCar;
