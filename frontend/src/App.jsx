import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";

import CarDetails from "./pages/CarDetails";

import AddCar from "./pages/admin/AddCar";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminCarForm from "./pages/admin/AdminCarForm";

import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/admin/cars/new" element={<AddCar />} />
          <Route path="/favourites" element={<Favourites />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/cars/new" element={<AdminCarForm />} />
          <Route path="/admin/cars/:id/edit" element={<AdminCarForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
