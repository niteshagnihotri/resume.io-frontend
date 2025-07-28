import { useState } from "react";
import { Link, NavLink } from "react-router"; // Use react-router-dom
import { FaBars } from "react-icons/fa";
import { cn } from "../utils/helper";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-sm">
      <div className="sm:max-w-11/12 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-medium text-primary">
          Resume.io
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-6 text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("hover:text-primary-light transition", isActive && "text-primary")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/build"
            className={({ isActive }) =>
              cn("hover:text-primary-light transition", isActive && "text-primary")
            }
          >
            Builder
          </NavLink>
          <NavLink to="/templates" className="hover:text-primary-light transition">
            Templates
          </NavLink>
          <NavLink to="/login" className="hover:text-primary-light transition">
            Login
          </NavLink>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="sm:hidden text-xl text-primary"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-1/3 bg-white/80 shadow-lg z-50 transform transition-transform duration-300 ease-in-out sm:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col px-4 py-4 space-y-4 text-base h-full justify-center">
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              cn("hover:text-primary-light", isActive && "text-primary")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/build"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              cn("hover:text-primary-light", isActive && "text-primary")
            }
          >
            Builder
          </NavLink>
          <NavLink
            to="/templates"
            onClick={toggleSidebar}
            className="hover:text-primary-light"
          >
            Templates
          </NavLink>
          <NavLink
            to="/login"
            onClick={toggleSidebar}
            className="hover:text-primary-light"
          >
            Login
          </NavLink>
        </nav>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-opacity-30 z-40 sm:hidden"
        />
      )}
    </header>
  );
}