import { FiSmile, FiMeh, FiFrown, FiExternalLink } from "react-icons/fi"; // Menambahkan FiExternalLink

export default function Grafik_sentimen({ total_tweets, data_preview }) {
  // Fungsi untuk mendapatkan ikon dan warna berdasarkan Sentimen
  const getSentimentStyle = (sentiment) => {
    switch (sentiment) {
      case "Positif":
        // Menggunakan FiSmile dari react-icons
        return { icon: FiSmile, color: "text-green-600", label: "Positif" };
      case "Netral":
        return { icon: FiMeh, color: "text-yellow-600", label: "Netral" };
      case "Negatif":
        return { icon: FiFrown, color: "text-red-600", label: "Negatif" };
      default:
        return { icon: FiMeh, color: "text-gray-500", label: "Unknown" };
    }
  };

  // Fungsi pembantu untuk memformat tanggal
  const formatDate = (isoString) => {
    try {
      // Mengambil hanya tanggal dari ISO string (YYYY-MM-DD)
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return isoString; // Fallback
    }
  };

  return (
    <div className="w-full max-h-[400px] shadow-xl p-5 rounded-2xl bg-white flex flex-col">
      <h1 className="text-xl font-bold mb-1 text-gray-900">
        Review Data Tweet
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Total {total_tweets} data tweets
      </p>

      <div className="grow overflow-y-auto overflow-x-auto pr-2">
        <table
          // MEMPERBARUI: Menambahkan lebar minimum agar semua kolom muat
          // min-w-[700px] + 2 kolom baru = min-w-[1000px]
          className="min-w-[1000px] table-fixed w-full"
        >
          {/* Header Tabel */}
          <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="w-[5%] py-2 pr-2">No</th>
              <th className="w-[35%] py-2 pr-2">Teks Tweet (Clean)</th>{" "}
              {/* Dikurangi dari 55% */}
              <th className="w-[15%] py-2 pr-2">Sentimen</th>{" "}
              {/* Dikurangi dari 25% */}
              <th className="w-[10%] py-2 pr-2">Polaritas</th>{" "}
              {/* Dikurangi dari 15% */}
              {/* KOLOM BARU 1: Tanggal Dibuat */}
              <th className="w-[15%] py-2 pr-2">Tanggal</th>
              {/* KOLOM BARU 2: Tautan Tweet */}
              <th className="w-[10%] py-2">Tautan</th>
            </tr>
          </thead>

          {/* Body Tabel */}
          <tbody>
            {data_preview.map((data, index) => {
              const {
                icon: Icon,
                color,
                label,
              } = getSentimentStyle(data.sentiment);

              return (
                <tr
                  key={index}
                  className="text-sm text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50"
                >
                  {/* Kolom No */}
                  <td className="py-3 pr-2 align-top">{index + 1}.</td>

                  {/* Kolom Teks */}
                  <td className="py-3 pr-2 align-top">
                    <p className="line-clamp-3">{data.clean_text}</p>
                  </td>

                  {/* Kolom Sentimen */}
                  <td className="py-3 pr-2 align-top">
                    <div className={`flex items-center font-medium ${color}`}>
                      <Icon className="w-4 h-4 mr-1" />
                      {label}
                    </div>
                  </td>

                  {/* Kolom Polaritas */}
                  <td className="py-3 pr-2 align-top">
                    <span className="font-mono text-gray-600">
                      {data.polarity.toFixed(2)}
                    </span>
                  </td>

                  <td className="py-3 pr-2 align-top">
                    <span className="text-xs text-gray-500">
                      {formatDate(data.created_at)}
                    </span>
                  </td>

                  <td className="py-3 align-top">
                    <a
                      href={data.tweet_url}
                      target="_blank"
                      // MENGUBAH STYLE LINK MENJADI TOMBOL:
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200 shadow-sm"
                    >
                      <FiExternalLink className="w-4 h-4" />{" "}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
