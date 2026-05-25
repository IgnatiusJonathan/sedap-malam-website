"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {

  const [name, setName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {

    const updateName = () => {
      const savedName = localStorage.getItem("nama");
      setName(savedName);
    };

    updateName();

    window.addEventListener("session-update", updateName);

    return () => {
      window.removeEventListener("session-update", updateName);
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("currentSession");
    localStorage.removeItem("nama");

    window.dispatchEvent(new Event("session-update"));

    setIsDropdownOpen(false);
  };

  const getNameText = () => {

    if (name === "admin") return "Admin ▼";

    if (name) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} ▼`;
    }

    return "Staff ▼";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (

    <header className="header">

      <div className="header-left">

        <h1>
          <span className="brand">SEDAP MALAM</span>{" "}
          <span className="tagline">Restaurant</span>
        </h1>

      </div>

      <div className="header-right">

        <div
          className="employee-login"
          id="profileMenu"
          onClick={toggleDropdown}
        >

          <span className="cashier-name">
            {getNameText()}
          </span>

          <div className="profile-icon">
            👤
          </div>

        </div>

        <div
          className={`dropdown ${
            isDropdownOpen ? "show" : ""
          }`}
          id="dropdownMenu"
        >

          <Link
            href="/login"
            onClick={handleLogout}
          >

            <img
              src="/images/logout.png"
              alt="Logout"
              className="dropdown-icon"
            />

            Logout

          </Link>

        </div>

      </div>

    </header>

  );
};

export default Header;