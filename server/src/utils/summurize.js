const { GoogleGenAI } = require("@google/genai"); // library GeminiAI for summurize prompt user
const ai = new GoogleGenAI({
  // API KEY
  apiKey: process.env.GEMINI_API_KEY,
});

async function summurize(text, lang = "id") {
  console.log("Text: ", text);
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Anda adalah generator kata kunci yang sangat efisien dan netral untuk sistem *data crawling* Twitter.

Tugas Anda adalah:
1.  Menganalisis kueri yang diberikan oleh pengguna.
2.  Merangkum inti dari kueri tersebut menjadi satu set kata kunci pencarian.
3.  Kata kunci harus **objektif** (tidak bias) dan **sangat relevan** dengan topik yang diminta.
4.  Jawaban Anda harus **HANYA** berupa kata kunci, tanpa teks pengantar, penjelasan, tanda kutip, atau tanda baca lainnya.
5.  Batas kata yang ketat: **MINIMAL 1 kata, MAKSIMAL 5 kata**.

Contoh Input Kueri: "Aku mau lihat hasil statistik apakah kinerja pemerintah baik."
Contoh Output yang Diharapkan: "kinerja pemerintah statistik"

Contoh Input Kueri: "Apa resep terbaik untuk membuat kue coklat yang lembut?"
Contoh Output yang Diharapkan: "resep kue coklat lembut"

Dan gunakan bahasa sesuai dengan code: ${lang}

kueri: ${text}
`,
    });

    const search_keyword = res.text;
    return search_keyword;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = summurize;
