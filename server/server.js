require("dotenv").config(); // Load variabel dari .env

// Besic Confor
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require("multer");

const TWEET_TOKEN = process.env.TWITTER_TOKEN;

// Import Utils
const summurize = require("./src/utils/summurize");
const relation_with_py = require("./src/utils/crawling_with_py");
const analyze_csv_with_py = require("./src/utils/analyze_csv_with_py");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // for parsing data JSON from client

app.get("/", (req, res) => {
  console.log("Hello World from server");
  return res.status(200).json({ message: "Hello from server" });
});

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tweets-data/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload_csv = multer({ storage: storage });

app.post("/search-opinion", async (req, res) => {
  // Take data
  const data = req.body;

  // If the data is not sent yet or null
  if (!data) {
    return res.status(400).json({ status: "400", message: "Data not valid" });
  }

  const { title_crawling, date_from, date_until, limit, lang } = data;

  if (!title_crawling) {
    return res.status(400).json({
      success: false,
      message: "Please enter a crawling query.",
    });
  }

  const search_keyword = await summurize(title_crawling);
  console.log("Generated keyword:", search_keyword);

  const int_limit = parseInt(limit);
  try {
    console.log("Crawling data from twitter...");
    const python_output = await relation_with_py(
      search_keyword,
      date_from,
      date_until,
      int_limit,
      lang,
      TWEET_TOKEN
    );

    console.log("Crawling finished");
    console.log(python_output);

    return res.status(200).json({
      success: true,
      search_keyword: search_keyword,
      data: python_output,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server failed" });
  }
});

app.post("/analyze-csv", upload_csv.single("input_file"), async (req, res) => {
  const csv_file = req.file || null;

  if (!csv_file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." });
  }

  try {
    console.log("Analyzing CSV file:", csv_file.filename);
    const python_output = await analyze_csv_with_py(csv_file.filename);

    console.log("Analysis finished");
    console.log(python_output);

    return res.status(200).json({
      success: true,
      data: python_output,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server failed" });
  }
});

app.get("/download/:file_name", (req, res) => {
  const { file_name } = req.params;

  let true_file_name = file_name;

  if (file_name.includes(" ")) {
    true_file_name = file_name.replace(" ", "-");
  }

  const file_path = path.join(__dirname, "tweets-data", true_file_name);

  res.download(file_path, true_file_name, (err) => {
    if (err) {
      console.error("Error downloading file:", err.message);

      if (err.code === "ENOENT") {
        return res
          .status(404)
          .json({ success: false, message: "File not found." });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to download file due to internal server error.",
      });
    }

    console.log("File berhasil dikirim.");
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Express berjalan di port ${PORT}`);
});
