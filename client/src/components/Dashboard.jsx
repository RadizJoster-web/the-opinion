import Header from "./dashboard_components/Header";
import Grafik_sentimen from "./dashboard_components/Grafik_sentimen";
import Presentanse from "./dashboard_components/Presentense";
import Fitur_extraction from "./dashboard_components/Fitur_extraction";
import Sponsor from "./dashboard_components/Sponsor";

export default function Dashboard({
  search_keyword,
  total_tweets,
  sentimen_count,
  fitur_tfidf_count,
  matrix_form,
  top_10_fitur,
  data_preview,
}) {
  return (
    <div className="flex w-full pb-50 fle flex-col gap-10 mt-10">
      <Header search_keyword={search_keyword} />

      <div className="w-full flex flex-col justify-center gap-10">
        <Grafik_sentimen
          total_tweets={total_tweets}
          data_preview={data_preview}
        />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-between lg:gap-0">
          <Fitur_extraction
            fitur_tfidf_count={fitur_tfidf_count}
            matrix_form={matrix_form}
            top_10_fitur={top_10_fitur}
          />
          <Presentanse sentimen_count={sentimen_count} />
        </div>
      </div>
    </div>
  );
}
