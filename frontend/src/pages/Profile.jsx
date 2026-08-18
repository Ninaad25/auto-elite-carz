
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Heart,
  CarFront,
  LogOut,
  ChevronRight,
  Edit,
  Save,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout, login } = useAuth();

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

 

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setMessage("");
    setError("");
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setMessage("");
    setError("");
    setEditing(false);
  };

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await api.put("/auth/profile", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      const updatedUser = response.data.user;

      /*
       * Update AuthContext + localStorage
       */
      login(localStorage.getItem("token"), updatedUser);

      setMessage("Profile updated successfully.");

      setEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);

      setError(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <User size={34} className="text-slate-400" />
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-950">
            You're not logged in
          </h1>

          <p className="mt-3 max-w-md text-slate-500">
            Login to view your Auto Elite Carz profile and saved cars.
          </p>

          <Link
            to="/login"
            className="mt-7 rounded-lg bg-slate-950 px-7 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your Auto Elite Carz account.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Profile Header */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-950 text-2xl font-black text-white">
                {initials}
              </div>

              <div className="flex-1">
                {!editing ? (
                  <>
                    <h2 className="text-2xl font-black text-slate-950">
                      {user?.name || "User"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">{user?.email}</p>

                    <span className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                      {user?.role || "USER"}
                    </span>
                  </>
                ) : (
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      Edit Profile
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Update your account information.
                    </p>
                  </div>
                )}
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  <Edit size={17} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

        
        </div>

        {/* Account Information */}
        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-black text-slate-950">
            Account Information
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <User size={18} className="text-slate-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>

                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-amber-500"
                      placeholder="Your name"
                    />
                  ) : (
                    <p className="mt-1 font-semibold text-slate-900">
                      {user?.name || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Mail size={18} className="text-slate-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-amber-500"
                      placeholder="Email address"
                    />
                  ) : (
                    <p className="mt-1 truncate font-semibold text-slate-900">
                      {user?.email || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Phone size={18} className="text-slate-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>

                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-amber-500"
                      placeholder="Phone number"
                    />
                  ) : (
                    <p className="mt-1 font-semibold text-slate-900">
                      {user?.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Type */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <User size={18} className="text-slate-500" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Account Type
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {user?.role === "ADMIN" ? "Administrator" : "Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {editing && (
            <div className="mt-6">
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {message && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                  {message}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <h3 className="text-lg font-black text-slate-950">Quick Actions</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Favourites */}
            <Link
              to="/favourites"
              className="flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50 sm:px-8"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Heart size={20} fill="currentColor" />
              </div>

              <div className="flex-1">
                <p className="font-bold text-slate-950">My Favourites</p>

                <p className="mt-1 text-sm text-slate-500">
                  View the cars you've saved.
                </p>
              </div>

              <ChevronRight size={20} className="text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-4 text-sm font-bold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </section>
    </main>
  );
}

export default Profile;
;
