import { useEffect, useState } from "react";
import {
  Car,
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  LockKeyhole,
} from "lucide-react";
import api from "../../services/api";

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data);
      } catch (err) {
        console.error("Admin stats error:", err);

        setError(
          err.response?.data?.message || "Unable to load dashboard statistics.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-red-700">Unable to load dashboard</h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500 p-3 text-slate-950">
              <LockKeyhole size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-black text-white">Dashboard</h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-400">
            Manage your car catalogue, monitor enquiries and keep track of your
            Auto Elite Carz platform.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Car}
            title="Total Cars"
            value={stats?.totalCars ?? 0}
            description="Cars in catalogue"
          />

          <StatCard
            icon={CheckCircle}
            title="Available"
            value={stats?.availableCars ?? 0}
            description="Currently available"
          />

          <StatCard
            icon={Clock}
            title="Reserved"
            value={stats?.reservedCars ?? 0}
            description="Currently reserved"
          />

          <StatCard
            icon={MessageSquare}
            title="New Enquiries"
            value={stats?.newEnquiries ?? 0}
            description="Need your attention"
          />
        </div>

        {/* Secondary stats */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <Users size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Registered Users</p>

                <p className="text-2xl font-black text-slate-950">
                  {stats?.totalUsers ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Sold Cars</p>

                <p className="text-2xl font-black text-slate-950">
                  {stats?.soldCars ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Management */}
        <div className="mt-10">
          <h2 className="text-xl font-black text-slate-950">Management</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <a
              href="/admin/cars"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Car size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">Manage Cars</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add, edit, delete and update car status.
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/enquiries"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <MessageSquare size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">Enquiries</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    View customer enquiries and update their status.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
