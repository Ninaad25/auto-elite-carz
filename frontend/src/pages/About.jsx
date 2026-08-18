import {
  ArrowRight,
  BadgeCheck,
  Car,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.16),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              <Sparkles size={16} className="text-amber-500" />
              About Auto Elite Carz
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Buying a used car
              <span className="block text-amber-500">should feel simple.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Auto Elite Carz is built to make discovering quality pre-owned
              cars easier, clearer and more convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Who We Are
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              A better way to explore pre-owned cars.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Finding the right used car can be overwhelming. There are
              countless options, different prices, varying conditions and
              endless specifications to compare.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Auto Elite Carz brings everything together in one simple
              catalogue. Browse vehicles, compare specifications and discover
              cars that match what you're looking for.
            </p>

            <Link
              to="/cars"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              Explore Our Cars
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-slate-950 p-8 shadow-xl sm:p-12">
              <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-900">
                <Car size={110} strokeWidth={1.2} className="text-amber-500" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-900 p-5">
                  <p className="text-3xl font-black text-white">Quality</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Focused selection
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900 p-5">
                  <p className="text-3xl font-black text-white">Simple</p>
                  <p className="mt-1 text-sm text-slate-400">Easy browsing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              What We Believe
            </div>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Built around the buyer
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Everything we do is focused on making your car-search experience
              straightforward.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Quality */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <ShieldCheck size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Quality First
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We focus on presenting vehicles with clear information so buyers
                can make informed decisions.
              </p>
            </div>

            {/* Transparency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <BadgeCheck size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Transparency
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Vehicle specifications, pricing and important details are
                presented clearly in one place.
              </p>
            </div>

            {/* Customer */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Heart size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Customer First
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We want every visitor to have a smooth and comfortable
                experience while searching for their next car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
            <Users size={27} />
          </div>

          <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl">
            Our mission
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            To create a simple and trustworthy platform where people can
            discover pre-owned cars with confidence, understand what they're
            looking at and take the next step without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Looking for your next car?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Explore our available vehicles and find one that's right for you.
          </p>

          <Link
            to="/cars"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600"
          >
            Browse Cars
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
