import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Sub_searchbar from "./components/Sub_searchbar";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";

function App() {
  // Data from client to server
  const [title_crawling, setTitle_crawling] = useState("");
  const [date_from, setDate_from] = useState("");
  const [date_until, setDate_until] = useState("");
  const [limit, setLimit] = useState(100);
  const [lang, setLang] = useState("id");

  const [csv_file, setcsv_file] = useState(null);

  // ============================================================
  // Data from server
  const [search_keyword, setsearch_keyword] = useState("");
  const [total_tweets, settotal_tweets] = useState(0);

  const [sentimen_count, setsentimen_count] = useState({
    positif: 0,
    netral: 0,
    negatif: 0,
  });
  const [fitur_tfidf_count, setfitur_tfidf_count] = useState(0);
  const [matrix_form, setmatrix_form] = useState("");
  const [top_10_fitur, settop_10_fitur] = useState(null);
  const [data_preview, setdata_preview] = useState(null);

  // Component
  const [searching, setSearching] = useState(false);
  const [show_sub_searchbar, setShow_sub_searchbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebar_open, setSidebar_open] = useState(false);

  // ============================================================
  const handle_searchbar = async (e) => {
    e.preventDefault();

    // 1. Cek apakah pengguna ingin melakukan crawling atau menganalisis file
    if (csv_file === null) {
      // Skenario 1: CRAWLING (Menggunakan prompt)
      if (title_crawling.trim() === "") {
        alert("Please enter a crawling query.");
        return;
      }

      const data = {
        title_crawling,
        date_from,
        date_until,
        limit,
        lang,
      };

      try {
        console.log("Start crawling data");
        setLoading(true);

        // Kirim sebagai JSON ke endpoint search-opinion
        const res = await fetch("http://localhost:3000/search-opinion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          console.error("Error crawling data:", res.statusText);
          // ... (handle error response if needed)
          return;
        }

        const result = await res.json();
        console.log("Data analyze successfully:", result.data);

        // ... (logic untuk set state hasil crawling)
        setsearch_keyword(result.search_keyword);
        setdata_preview(result.data.data_preview);
        settotal_tweets(result.data.total_tweets);

        setsentimen_count({
          positif: result.data.sentiment_summary.Positif
            ? result.data.sentiment_summary.Positif
            : 0,
          netral: result.data.sentiment_summary.Netral
            ? result.data.sentiment_summary.Netral
            : 0,
          negatif: result.data.sentiment_summary.Negatif
            ? result.data.sentiment_summary.Negatif
            : 0,
        });

        setfitur_tfidf_count(
          result.data.fitur_ekstraksi_info.jumlah_fitur_tfidf
        );
        setmatrix_form(result.data.fitur_ekstraksi_info.bentuk_matrix);
        settop_10_fitur(result.data.fitur_ekstraksi_info.top_10_fitur_contoh);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(true);
        setLoading(false);
      }
    } else {
      // Skenario 2: ANALISIS FILE (Menggunakan csv_file)

      // Gunakan FormData untuk mengirim file
      const formData = new FormData();
      formData.append("input_file", csv_file); // Pastikan nama field ini ("csv_file") sesuai dengan yang diharapkan oleh Express

      try {
        console.log("Start analyzing CSV file");
        setLoading(true);

        // Kirim sebagai FormData ke endpoint analyze-csv
        const res = await fetch("http://localhost:3000/analyze-csv", {
          method: "POST",
          // PENTING: Jangan set Content-Type untuk FormData, browser akan melakukannya secara otomatis
          body: formData,
        });

        if (!res.ok) {
          console.error("Error analyzing CSV file:", res.statusText);
          // ... (handle error response if needed)
          return;
        }

        const result = await res.json();
        console.log("Data analyze successfully:", result.data);

        setsearch_keyword(csv_file.name); // Gunakan nama file sebagai keyword pencarian
        setdata_preview(result.data.data_preview);
        settotal_tweets(result.data.total_tweets);

        setsentimen_count({
          positif: result.data.sentiment_summary.Positif
            ? result.data.sentiment_summary.Positif
            : 0,
          netral: result.data.sentiment_summary.Netral
            ? result.data.sentiment_summary.Netral
            : 0,
          negatif: result.data.sentiment_summary.Negatif
            ? result.data.sentiment_summary.Negatif
            : 0,
        });

        setfitur_tfidf_count(
          result.data.fitur_ekstraksi_info.jumlah_fitur_tfidf
        );
        setmatrix_form(result.data.fitur_ekstraksi_info.bentuk_matrix);
        settop_10_fitur(result.data.fitur_ekstraksi_info.top_10_fitur_contoh);

        // Setelah berhasil, reset csv_file (opsional)
        // setcsv_file(null);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(true);
        setLoading(false);
      }
    }
  };

  // ... (rest of App.jsx)

  return (
    <main className="w-screen flex flex-col justify-center items-center px-10 xl-px-20 xl:pl-90 pt-[100px]">
      <Navbar sidebar_open={sidebar_open} setSidebar_open={setSidebar_open} />
      <Aside sidebar_open={sidebar_open} setSidebar_open={setSidebar_open} />
      <Header searching={searching} />

      <Searchbar
        // Data
        title_crawling={title_crawling}
        setTitle_crawling={setTitle_crawling}
        csv_file={csv_file}
        setcsv_file={setcsv_file}
        // Function
        handle_searchbar={handle_searchbar}
        // styleist
        searching={searching}
        show_sub_searchbar={show_sub_searchbar}
        setShow_sub_searchbar={setShow_sub_searchbar}
      />

      <Sub_searchbar
        // Data
        setDate_from={setDate_from}
        setDate_until={setDate_until}
        limit={limit}
        setLimit={setLimit}
        setLang={setLang}
        // styleist
        searching={searching}
        show_sub_searchbar={show_sub_searchbar}
      />

      {loading && <Loading />}

      {searching && (
        <Dashboard
          search_keyword={search_keyword}
          total_tweets={total_tweets}
          sentimen_count={sentimen_count}
          fitur_tfidf_count={fitur_tfidf_count}
          matrix_form={matrix_form}
          top_10_fitur={top_10_fitur}
          data_preview={data_preview}
        />
      )}
    </main>
  );
}

export default App;
