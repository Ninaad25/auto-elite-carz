
import { Link } from "react-router-dom";
import {
  Heart,
  Menu,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/auto-elite-carz-logo.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="Auto Elite Carz"
            className="h-17 w-auto object-contain"
          />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden items-center gap-9 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-amber-600"
          >
            Home
          </Link>

          <Link
            to="/cars"
            className="text-sm font-semibold text-slate-600 transition hover:text-amber-600"
          >
            Browse Cars
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-amber-600"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium text-slate-600 transition hover:text-amber-600"
          >
            Contact
          </Link>
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Favourites */}
          <Link
            to="/favourites"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-red-500"
            title="Favourites"
          >
            <Heart size={19} strokeWidth={1.8} />
          </Link>

          {/* Authenticated User */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* User info */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-30">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-slate-500">Account</p>
                </div>
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                title="Logout"
              >
                <LogOut size={18} strokeWidth={1.8} />
              </button>
            </div>
          ) : (
            /* Login */
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-900 hover:bg-slate-950 hover:text-white"
            >
              <User size={17} strokeWidth={1.8} />
              Login
            </Link>
          )}
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            {/* Mobile navigation */}
            <nav className="flex flex-col">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Home
              </Link>

              <Link
                to="/cars"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:text-amber-600"
              >
                Browse Cars
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Contact
              </Link>

              <Link
                to="/favourites"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Heart size={18} strokeWidth={1.8} />
                Favourites
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-4 border-t border-slate-100" />

            {/* Mobile authentication */}
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* User */}
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user?.email || ""}
                    </p>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={18} strokeWidth={1.8} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                <User size={17} strokeWidth={1.8} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
;
