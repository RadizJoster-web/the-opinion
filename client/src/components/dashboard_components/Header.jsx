import { FaDownload } from "react-icons/fa6";

export default function Header({ search_keyword }) {
  const handleDownload = async (e) => {
    e.preventDefault();

    // 1. Definisikan URL API download Anda
    const downloadUrl =
      "http://localhost:3000/download/" + search_keyword + ".csv";

    // 2. Arahkan browser ke URL tersebut
    window.location.href = downloadUrl;
  };

  return (
    <div className="w-full flex justify-between items-center shadow-lg p-5 rounded-xl">
      <h1 className="text-2xl font-bold">{search_keyword}</h1>
      <button
        onClick={(e) => handleDownload(e)}
        className="flex items-center gap-2 px-5 py-3 shadow rounded-2xl bg-dark-black text-white hover:bg-gray hover:text-black duration-150"
      >
        <FaDownload />
        Download CSV
      </button>
    </div>
  );
}
