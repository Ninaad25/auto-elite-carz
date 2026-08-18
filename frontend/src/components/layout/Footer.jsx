import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl">
                🚗
              </div>

              <div>
                <div className="text-xl font-black">Auto Elite</div>

                <div className="text-xs font-semibold tracking-[0.25em] text-amber-500">
                  CARZ
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Discover carefully selected pre-owned cars at Auto Elite Carz.
              Every vehicle is listed with transparent pricing and detailed
              information to help you make the right choice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>

              <Link to="/cars" className="transition hover:text-white">
                Browse Cars
              </Link>

              <a href="#about" className="transition hover:text-white">
                About Us
              </a>

              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="font-semibold">Contact Us</h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Phone size={17} />
                <span>+91 XXXXX XXXXX </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={17} />
                <span>info@autoelitecarz.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Auto Elite Carz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
