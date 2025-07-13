import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white">
      <div className="container mx-auto flex justify-between items-center p-3 px-4">
        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-200 transition">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Center Message */}
        <div className="text-m text-center flex-grow">
          <span>Discover top-rated events, workshops, and meetups across India 🎉</span>
        </div>

        {/* Contact */}
        <div className="text-sm hidden md:block">
          <a href="tel:+919876543210" className="hover:text-gray-200 transition text-m">
            +91 9876543210
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
