import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// 1. Tiga warna kustom yang kontras dan cocok dengan background putih
const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Hijau (Positif), Kuning (Netral), Merah (Negatif)

export default function Presentanse({ sentimen_count }) {
  const [data, setData] = useState([]);
  const [largestPercentageItem, setLargestPercentageItem] = useState(null);

  useEffect(() => {
    // --- Algoritma Kalkulasi Persentase dan Penentuan Terbesar ---
    const total =
      sentimen_count.positif + sentimen_count.netral + sentimen_count.negatif; // total = 15 + 20 + 12 = 47

    const processedData = [
      {
        name: "Positif",
        value: sentimen_count.positif,
        // Properti percentage ditambahkan kembali
        percentage: (sentimen_count.positif / total) * 100,
      },
      {
        name: "Netral",
        value: sentimen_count.netral,
        // Properti percentage ditambahkan kembali
        percentage: (sentimen_count.netral / total) * 100,
      },
      {
        name: "Negatif",
        value: sentimen_count.negatif,
        // Properti percentage ditambahkan kembali
        percentage: (sentimen_count.negatif / total) * 100,
      },
    ];

    setData(processedData);

    // Tentukan Kategori dengan Persentase Terbesar
    // Memastikan data valid sebelum reduce
    const largest = processedData.reduce((prev, current) =>
      prev && current && prev.percentage > current.percentage ? prev : current
    );

    setLargestPercentageItem(largest);
    // -----------------------------------------------------------------
  }, [sentimen_count]); // Tambahkan sentimen_count sebagai dependency

  // Fungsi untuk menampilkan label persentase di tengah slice
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    // Menghitung posisi label
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {/* Tampilkan persentase dibulatkan ke bawah */}
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full shadow-xl rounded-2xl p-5">
      <h1 className="text-xl font-bold mb-4">Sentimen Masyarakat</h1>

      <div className="flex flex-col sm:flex-row sm:items-center lg:items-center">
        <div className="w-full sm:w-1/2 lg:w-full">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-in-out"
                label={renderCustomLabel} // Menampilkan persentase di slice
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 w-full sm:w-1/2 sm:mt-0 sm:pl-4 lg:w-full lg:pl-0 lg:mt-4">
          <div className="grid sm:grid-cols-1 grid-cols-3 gap-2 lg:gap-0 text-base text-gray-700">
            {data.map((item, index) => (
              <div key={item.name} className="flex flex-col sm:flex-row py-1">
                <div className="flex items-center">
                  <span
                    className="font-semibold px-2 py-1 rounded-md text-white mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  >
                    {item.name}
                  </span>
                </div>

                <span className="text-gray-600 font-medium mt-1">
                  {item.value} tweets
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {largestPercentageItem && (
        <div className="mt-4 p-3 border-t border-gray-300 text-center">
          <p className="text-md font-bold text-gray-700">
            Sentimen Terbesar Saat Ini:{" "}
            <span className="text-gray-900">{largestPercentageItem.name}</span>
          </p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">
            {largestPercentageItem.percentage
              ? largestPercentageItem.percentage.toFixed(1)
              : "0.0"}
            %
          </p>
        </div>
      )}
    </div>
  );
}
