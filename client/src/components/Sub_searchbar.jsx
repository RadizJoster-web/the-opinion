import lang from "../assets/lang/lang";

export default function Sub_searchbar({
  // Data
  setDate_from,
  setDate_until,
  limit,
  setLimit,
  setLang,

  // Component
  searching,
  show_sub_searchbar,
}) {
  const finalPosition = searching
    ? "bottom-45 z-20"
    : "bottom-50 lg:bottom-60 z-20";

  return (
    <div
      className={`fixed w-95/100 max-w-5xl mx-auto grid grid-cols-2 -z-50 lg:grid-cols-4 justify-center items-center gap-2 lg:gap-5 bg-black text-white p-5 rounded-2xl transition-all duration-500 ease-in-out ${
        show_sub_searchbar
          ? finalPosition
          : "opacity-0 bottom-70 pointer-events-none"
      } `}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="date_from">Date From</label>
        <input
          type="date"
          id="date_from"
          name="date_from"
          // Perubahan: Menggunakan w-full agar input mengisi kolom grid
          className="bg-dark-black px-5 py-2 rounded-xl w-full"
          onChange={(e) => setDate_from(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date_until">Date Until</label>
        <input
          type="date"
          id="date_until"
          name="date_until"
          // Perubahan: Menggunakan w-full
          className="bg-dark-black px-5 py-2 rounded-xl w-full"
          onChange={(e) => setDate_until(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="limit">Limit Crawling</label>
        <input
          type="number"
          id="limit"
          name="limit"
          value={limit}
          // Perubahan: Mengganti w-30 dengan w-full
          className="bg-dark-black w-full py-2 px-5 rounded-xl"
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lang">Language</label>

        <select
          name="lang"
          id="lang"
          // Perubahan: Mengganti w-50 dengan w-full
          className="bg-dark-black w-full py-2 px-5 rounded-xl"
          onChange={(e) => setLang(e.target.value)}
        >
          {lang.map((l, index) => (
            <option
              key={index}
              value={l.code}
              className="bg-bg-dark-black hover:black duration-150"
            >
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
