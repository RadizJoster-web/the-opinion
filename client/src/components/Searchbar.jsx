import { useState } from "react";
// Mengganti SVG inline dengan import dari react-icons
import { IoMdSend } from "react-icons/io";
import { PiList } from "react-icons/pi";
import { IoIosLink } from "react-icons/io";

export default function Searchbar({
  title_crawling,
  csv_file,
  setcsv_file,
  setTitle_crawling,
  searching,
  show_sub_searchbar,
  setShow_sub_searchbar,
  handle_searchbar,
}) {
  const [isFocus, setIsfocus] = useState(false);
  const [word_count, setword_count] = useState(0);

  const positionClass = searching
    ? "bottom-[60px]"
    : "bottom-10 lg:bottom-1/2 lg:translate-y-10";

  // Fungsi utilitas untuk menghitung kata secara akurat
  const count_words = (text) => {
    if (!text) return 0; // Kembalikan 0 jika text kosong

    // Memisahkan string berdasarkan spasi dan menghitung jumlah kata yang valid
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    return words.length;
  };

  const max_words = 20;

  const handle_counter_words = (text) => {
    const new_word_count = count_words(text);

    if (new_word_count <= max_words) {
      setTitle_crawling(text);
    }

    setword_count(new_word_count);
  };

  return (
    <div
      className={`fixed z-20 w-full max-w-2xl px-3 sm:px-5 mx-auto bg-white rounded-2xl transition-all duration-300 ${positionClass} ${
        isFocus ? "scale-101 shadow-2xl" : "scale-100 shadow-xl"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row items-center gap-2 p-3 sm:p-4 rounded-2xl`}
      >
        {csv_file === null ? (
          <div className="w-full flex items-center gap-2">
            <p
              className={`text-sm ${
                word_count >= max_words ? "text-red" : "text-black"
              }`}
            >
              {word_count}
            </p>
            <input
              type="search"
              name="search_input"
              id="search_input"
              placeholder="Enter crawling query..."
              className="w-full h-10 outline-none p-2 text-lg md:h-full"
              onFocus={() => setIsfocus(true)}
              onBlur={() => setIsfocus(false)}
              value={title_crawling}
              onChange={(e) => handle_counter_words(e.target.value)}
            />
          </div>
        ) : (
          <div className="w-full h-10 md:h-full">
            <p className="text-lg">{csv_file.name}</p>
          </div>
        )}

        <div className="flex w-full md:w-auto items-center justify-end gap-2 mt-2 md:mt-0">
          <label
            htmlFor="input_file"
            className="group relative flex items-center justify-center gap-2 w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 duration-150 cursor-pointer shadow"
          >
            <input
              type="file"
              id="input_file"
              name="input_file"
              className="hidden"
              accept=".csv"
              onChange={(e) => setcsv_file(e.target.files[0])}
            />
            <IoIosLink className="w-5 h-5 text-gray-700" />
            <p className="absolute -top-10 w-32 text-center bg-gray-800 text-white p-1 rounded-lg hidden group-hover:block text-xs z-30">
              Import CSV File
            </p>
          </label>

          {/* Tombol Sub-Searchbar/List */}
          <button
            onClick={() => setShow_sub_searchbar(!show_sub_searchbar)}
            className="flex items-center justify-center gap-2 w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 duration-150 shadow"
          >
            <PiList className="w-6 h-6 text-gray-700" />
          </button>

          {/* Tombol Send/Kirim */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-xl hover:bg-gray-800 duration-150 shadow-md"
            onClick={(e) => handle_searchbar(e)}
          >
            <span className="text-sm sm:text-base">Send</span>
            <IoMdSend className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
