import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 scroll-smooth border-gray-200 shadow ${
        scrolled ? "bg-black/40 backdrop-blur-md" : "bg-white "
      }`}
    >
      <Link to="/" className={`text-xl font-bold ${scrolled ? "text-white" : "text-black"} transition-all duration-300`}>
        FreelanceHub
      </Link>

      <nav className="flex items-center space-x-4">
        <Link to="/login">
          <Button className={`${scrolled ? "border-none" : "border"}`} variant={`${scrolled ? "brutal" : "outline"}`}>Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="destructive_green" className="text-white border-none">
            Register
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
