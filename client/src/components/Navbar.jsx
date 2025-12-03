import { PiList } from "react-icons/pi"; // Import ikon List

export default function Navbar({ sidebar_open, setSidebar_open }) {
  return (
    <nav
      // --- Responsive Positioning ---
      // Default (Mobile): absolute top-0, w-full, padding horizontal 5 (px-5)
      // Large (Desktop - lg): lg:right-0, lg:w-[calc(100vw-320px)], padding horizontal 15 (lg:px-15)
      className="absolute top-0 w-full px-5 xl:right-0 xl:w-[calc(100vw-320px)] flex justify-between items-center h-25 xl:px-15"
    >
      {/* Container untuk Tombol List (Mobile Only) dan Judul Dashboard */}
      <div className="flex items-center">
        {/* 1. Tombol untuk memanggil aside (Hanya terlihat di Mobile) */}
        <button
          // Default: terlihat (hidden: false), Large (lg): hidden
          // Revisi 1: Ukuran p-2 (padding) dihapus, hanya menyisakan hover:bg-gray-100 untuk area klik
          onClick={() => setSidebar_open(!sidebar_open)}
          className="xl:hidden p-2 rounded-xl shadow-xl hover:bg-gray duration-150"
        >
          {/* Revisi 1: Mengubah ukuran ikon menjadi 2xl */}
          <PiList className="text-2xl text-dark-black" />
        </button>

        {/* Revisi 1: Menghilangkan gap antara tombol dan Dashboard */}
        <h1 className="font-bold text-dark-black text-2xl ml-3 xl:ml-0">
          Dashboard
        </h1>
      </div>

      {/* Tombol Login/Sign in (Grup di Kanan) */}
      <div className="flex items-center gap-3">
        {/* 2. Revisi Tampilan Clean: Menyembunyikan tombol Login/Sign in di mobile (default) */}
        {/* Hanya tampil di layar besar (lg:flex) */}
        <button className="hidden lg:flex px-5 py-3 shadow rounded-2xl hover:bg-gray duration-150">
          Login
        </button>
        <button className="hidden lg:flex px-5 py-3 shadow rounded-2xl hover:bg-gray duration-150">
          Sign in
        </button>
      </div>
    </nav>
  );
}
