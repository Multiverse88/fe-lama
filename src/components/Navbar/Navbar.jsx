import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLink, useNavigate } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import Cookies from "js-cookie"; 

export const NavbarLinks = [
  { name: "Beranda", link: "/" },
  { name: "Tentang Kami", link: "/AboutPage" },
  { name: "Kontak", link: "/#Contact" }, 
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("token");
  const navLinks = isLoggedIn
    ? [
        ...NavbarLinks.slice(0, 1),
        { name: "Pick & Pack", link: "/CategoryPage" },
        ...NavbarLinks.slice(1),
      ]
    : NavbarLinks;

  const handleScrollToContact = (e) => {
    e.preventDefault(); 
    navigate("/"); 

    setTimeout(() => {
      const contactSection = document.getElementById("Contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleNavigateToHome = () => {
    navigate("/"); 
    window.scrollTo(0, 0); 
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex items-center py-6">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/images/Logo.png" className="h-8" alt="E-whale Logo" />
            </a>
          </div>

          {/* Menu Section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {navLinks.map((navItem) => (
                <li key={navItem.name}>
                  {navItem.name === "Kontak" ? (
                    <button
                      onClick={handleScrollToContact}
                      className="inline-block py-1 px-3 font-semibold hover:text-primary"
                    >
                      {navItem.name}
                    </button>
                  ) : navItem.name === "Beranda" ? (
                    <NavLink
                      to={navItem.link}
                      className={({ isActive }) =>
                        `inline-block py-1 px-3 font-semibold ${
                          isActive ? "text-primary" : "hover:text-primary"
                        }`
                      }
                      onClick={handleNavigateToHome}
                    >
                      {navItem.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={navItem.link}
                      className={({ isActive }) =>
                        `inline-block py-1 px-3 font-semibold ${
                          isActive ? "text-primary" : "hover:text-primary"
                        }`
                      }
                    >
                      {navItem.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-8 space-x-2 md:space-x-4">
            <NavLink to="CartPage">
              <button className="text-3xl hover:text-primary">
                <PiShoppingCartLight />
              </button>
            </NavLink>

            {!open && isLoggedIn && (
              <div className="hidden md:block">
                <AvatarDropdown />
              </div>
            )}

            {isLoggedIn ? null : (
              <NavLink to="RegisterPage">
                <button
                  type="button"
                  className="text-white bg-primary focus:outline-none font-semibold rounded-full text-sm px-4 py-2 text-center"
                >
                  Registrasi
                </button>
              </NavLink>
            )}

            {/* Mobile hamburger menu Section */}
            <div className="lg:hidden" onClick={() => setOpen(!open)}>
              <MdMenu className="text-4xl" />
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Sidebar Section */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;