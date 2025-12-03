import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
  AiFillGithub, // Untuk Github
  AiOutlineTwitter, // Untuk Tweeter
} from "react-icons/ai";

import {
  BsInstagram, // Untuk Instagram
  BsLinkedin, // Untuk Linkdn
  BsPersonLinesFill, // Untuk My Portfolio (Person lines)
  BsChatDots, // Untuk Contact (Chat Dots)
} from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { PiList } from "react-icons/pi"; // Import ikon List

export default function Aside({ sidebar_open, setSidebar_open }) {
  // Data untuk navigasi menu
  const navItems = [
    { name: "Home", icon: AiOutlineHome, link: "/", active: true },
    {
      name: "Github",
      icon: AiFillGithub,
      link: "https://github.com/RadizJoster-web",
    },
    {
      name: "Instagram",
      icon: BsInstagram,
      link: "https://www.instagram.com/radizslur/?next=%2F",
    },
    {
      name: "Linkdn",
      icon: BsLinkedin,
      link: "https://www.linkedin.com/in/radiz-dirganta-834677331/",
    },
    { name: "Tweeter", icon: AiOutlineTwitter, link: "#" },
    { name: "My Portfolio", icon: BsPersonLinesFill, link: "#" },
    {
      name: "Contact",
      icon: BsChatDots,
      link: "https://wa.me/6285782599453",
      target: "_blank",
    },
  ];

  return (
    <nav
      className={`fixed top-0 ${
        sidebar_open ? "left-0" : "-left-full"
      } xl:left-0 z-40 w-full lg:w-80 min-h-screen flex flex-col py-5 px-5 bg-dark-black text-white transition-all duration-300`}
    >
      <div className="flex items-center py-5 mb-5 gap-5">
        <button
          // Default: terlihat (hidden: false), Large (lg): hidden
          // Revisi 1: Ukuran p-2 (padding) dihapus, hanya menyisakan hover:bg-gray-100 untuk area klik
          onClick={() => setSidebar_open(!sidebar_open)}
          className="xl:hidden p-2 rounded-xl hover:bg-black transition-colors"
        >
          {/* Revisi 1: Mengubah ukuran ikon menjadi 2xl */}
          <PiList className="text-2xl text-white" />
        </button>
        {/* Bagian Logo */}
        <div className="xl:mb-10 xl:pl-4">
          <h1 className="text-3xl font-bold tracking-wider">The Opinion</h1>
        </div>
      </div>

      {/* Bagian Menu Navigasi Utama */}
      <ul className="grow space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.link}
              target={item.target || "_self"}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                item.active
                  ? "bg-white text-dark-black font-semibold" // Warna Putih untuk item aktif
                  : "text-white hover:bg-black" // Hitam untuk hover
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-lg">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Bagian Log Out */}
      <div className="mt-auto pt-5 border-t border-black">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-xl text-white hover:bg-black transition-colors"
        >
          <FiLogOut className="w-6 h-6" />
          <span className="text-lg">Log Out</span>
        </a>
      </div>
    </nav>
  );
}
