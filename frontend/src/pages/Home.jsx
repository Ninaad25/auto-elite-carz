
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  BadgeCheck,
  Car,
} from "lucide-react";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/cars?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/cars");
    }
  };

  return (
    <main>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-162.5 overflow-hidden bg-slate-950">
        {/* Animation styles */}
        <style>{`
          @keyframes floatOne {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(70px, 40px, 0) scale(1.12);
            }
          }

          @keyframes floatTwo {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(-80px, -50px, 0) scale(1.08);
            }
          }

          @keyframes floatThree {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }
            50% {
              transform: translate3d(50px, -35px, 0);
            }
          }

          @keyframes lightSweep {
            0% {
              transform: translateX(-120%) rotate(-12deg);
              opacity: 0;
            }

            15% {
              opacity: 0.5;
            }

            50% {
              opacity: 0.25;
            }

            85% {
              opacity: 0.5;
            }

            100% {
              transform: translateX(120%) rotate(-12deg);
              opacity: 0;
            }
          }

          @keyframes gridMove {
            0% {
              transform: translateY(0);
            }

            100% {
              transform: translateY(80px);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.35;
            }

            50% {
              opacity: 0.7;
            }
          }

          .hero-orb-one {
            animation: floatOne 12s ease-in-out infinite;
          }

          .hero-orb-two {
            animation: floatTwo 15s ease-in-out infinite;
          }

          .hero-orb-three {
            animation: floatThree 10s ease-in-out infinite;
          }

          .hero-light-sweep {
            animation: lightSweep 9s ease-in-out infinite;
          }

          .hero-grid {
            animation: gridMove 18s linear infinite;
          }

          .hero-glow {
            animation: pulseGlow 5s ease-in-out infinite;
          }
        `}</style>

        {/* =====================================================
            BACKGROUND GLOW ORBS
        ====================================================== */}

        <div
          className="
            hero-orb-one
            absolute
            -left-40
            -top-40
            h-125
            w-125
            rounded-full
            bg-amber-500/10
            blur-[120px]
          "
        />

        <div
          className="
            hero-orb-two
            absolute
            -right-40
            top-20
            h-137.5
            w-137.5
            rounded-full
            bg-blue-500/10
            blur-[130px]
          "
        />

        <div
          className="
            hero-orb-three
            absolute
            bottom-62.5
            left-[35%]
            h-125
            w-125
            rounded-full
            bg-amber-400/10
            blur-[120px]
          "
        />

        {/* =====================================================
            MOVING LIGHT STREAKS
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              hero-light-sweep
              absolute
              left-[-30%]
              top-[25%]
              h-0.5
              w-[160%]
              bg-linear-to-r
              from-transparent
              via-amber-400/50
              to-transparent
              blur-[1px]
            "
          />

          <div
            className="
              hero-light-sweep
              absolute
              left-[-30%]
              top-[55%]
              h-px
              w-[160%]
              bg-linear-to-r
              from-transparent
              via-white/20
              to-transparent
              blur-[1px]
            "
            style={{
              animationDelay: "3s",
            }}
          />

          <div
            className="
              hero-light-sweep
              absolute
              left-[-30%]
              top-[75%]
              h-0.5
              w-[160%]
              bg-linear-to-r
              from-transparent
              via-amber-500/30
              to-transparent
              blur-[2px]
            "
            style={{
              animationDelay: "6s",
            }}
          />
        </div>

        {/* =====================================================
            TECH GRID
        ====================================================== */}

        <div
          className="
            hero-grid
            pointer-events-none
            absolute
            inset-0
            opacity-[0.045]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* =====================================================
            RADIAL GLOW
        ====================================================== */}

        <div
          className="
            hero-glow
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-125
            w-200
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-amber-500/[0.035]
            blur-[100px]
          "
        />

        {/* =====================================================
            DARK OVERLAY
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/40 to-slate-950" />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-slate-950/80" />

        {/* =====================================================
            HERO CONTENT
        ====================================================== */}

        <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-300 shadow-lg backdrop-blur-md">
              <BadgeCheck size={16} className="text-amber-500" />

              <span>Carefully selected pre-owned cars</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find a car you'll
              <span className="block text-amber-500">love to drive.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Explore quality pre-owned cars with transparent pricing, detailed
              specifications and a hassle-free buying experience.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="
                mt-10
                flex
                max-w-2xl
                flex-col
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/97
                p-3
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                sm:flex-row
              "
            >
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search className="text-slate-400" size={21} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by brand or model..."
                  className="
                    w-full
                    bg-transparent
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-7
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-amber-600
                  hover:shadow-lg
                  hover:shadow-amber-600/20
                "
              >
                Search Cars
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Small trust indicators */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Quality checked
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Transparent pricing
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Detailed specifications
              </span>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-950 to-transparent" />
      </section>

      {/* =========================================================
          TRUST SECTION
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Carefully Selected</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Quality vehicles selected for our catalogue.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <BadgeCheck size={24} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Transparent Details</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Clear pricing and detailed vehicle information.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Car size={24} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Wide Selection</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Explore cars across popular brands and segments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Ready to find your next car?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Browse our complete collection of available pre-owned cars.
          </p>

          <Link
            to="/cars"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-slate-950
              px-7
              py-3.5
              font-semibold
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Browse All Cars
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
