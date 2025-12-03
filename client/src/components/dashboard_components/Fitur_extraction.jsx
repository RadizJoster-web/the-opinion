export default function Fitur_extraction({
  fitur_tfidf_count,
  matrix_form,
  top_10_fitur,
}) {
  return (
    <div className="w-full h-100 shadow-xl rounded-2xl p-5 bg-white flex flex-col">
      <h1 className="text-xl font-bold mb-4">Hasil Ekstrak Fitur TF-IDF</h1>

      {/* Bagian Statistik Utama (Stat Card) */}
      <div className="space-y-4 mb-6">
        {/* Jumlah Fitur */}
        <div className="bg-blue-50 p-2 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm font-medium text-blue-700">
            Total Fitur Unik (Vocabulary)
          </p>
          <p className="text-2xl font-extrabold text-gray-900">
            {fitur_tfidf_count}
          </p>
        </div>

        {/* Bentuk Matrix */}
        <div className="bg-gray-50 p-2 rounded-lg border-l-4 border-gray-500">
          <p className="text-sm font-medium text-gray-700">
            Dimensi Matrix (Dokumen x Fitur)
          </p>
          <p className="text-lg font-bold text-gray-900">{matrix_form}</p>
        </div>
      </div>

      {/* Bagian Top 10 Fitur Contoh (List/Tag) */}
      <div className="grow">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1 border-gray-200">
          Top 10 Fitur Contoh
        </h2>

        {/* Container untuk tag/chip */}
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-32">
          {top_10_fitur.map((fitur, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-gray text-gray-700 rounded hover:bg-gray-300 transition-colors cursor-default"
            >
              {fitur}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
