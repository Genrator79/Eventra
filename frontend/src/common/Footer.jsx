import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Eventra</h2>
          <p className="text-sm text-white/80">
            Making your events magical, organized, and unforgettable.
            <br />
            Seamless experiences curated with passion and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm text-white/80">
            <FiPhoneCall className="text-xl" />
            +91 9876543210
          </p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:scale-110 transition">
              <TbBrandMeta className="text-2xl" />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <IoLogoInstagram className="text-2xl" />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <RiTwitterXLine className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Eventra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
