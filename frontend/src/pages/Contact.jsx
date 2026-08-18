import { useState } from "react";
import {
  Car,
  CheckCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.16),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              <MessageSquare size={16} className="text-amber-500" />
              Get in touch
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Let's find your
              <span className="block text-amber-500">next car.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Have a question about a vehicle or want to know more? Send us a
              message and we'll get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-24">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Contact Us
            </div>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              We're here to help.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              Whether you're interested in a particular car or simply have a
              question, feel free to reach out.
            </p>

            <div className="mt-8 space-y-5">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-400">Phone</p>

                  <p className="mt-1 font-bold text-slate-900">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-400">Email</p>

                  <p className="mt-1 font-bold text-slate-900">
                    contact@autoelitecarz.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            {/* Small trust card */}
            <div className="mt-10 rounded-2xl bg-slate-950 p-6">
              <div className="flex items-center gap-3">
                <Car className="text-amber-500" size={24} />

                <div>
                  <p className="font-bold text-white">Looking for a car?</p>

                  <p className="mt-1 text-sm text-slate-400">
                    Browse our available vehicles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="flex min-h-105 flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle size={32} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    Message sent!
                  </h3>

                  <p className="mt-3 max-w-md leading-7 text-slate-500">
                    Thanks for reaching out. We'll get back to you as soon as
                    possible.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-950">
                    Send us a message
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Fill in the details below and we'll get back to you.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    {/* Name + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Message
                      </label>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={6}
                        required
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600"
                    >
                      Send Message
                      <Send size={17} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
