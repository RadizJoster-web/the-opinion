const { spawn } = require("child_process"); // Sudah di-import di awal
const generate_date_range = require("./generate_date_range"); // Sudah di-import di awal

async function relation_with_py(
  search_keyword,
  date_from,
  date_until,
  limit_tweet,
  lang,
  TWEET_TOKEN
) {
  //   If date_from and until undifined or null so this function generated default value from 5 monts ago & untli today
  let default_date_from = date_from;
  let default_date_until = date_until;

  if (
    date_from === "" ||
    date_from === undefined ||
    date_until === "" ||
    date_until === undefined
  ) {
    const { generate_date_from, generate_date_until } = generate_date_range(
      date_from,
      date_until
    );

    default_date_from = generate_date_from;
    default_date_until = generate_date_until;
  }

  const input_data = {
    search_keyword: search_keyword,
    date_from: default_date_from,
    date_until: default_date_until,
    limit_tweet: limit_tweet ? limit_tweet : 100,
    lang: lang ? lang : "id",
    TWEET_TOKEN: TWEET_TOKEN,
  };

  console.log(input_data);

  return new Promise((resolve, reject) => {
    try {
      const python_process = spawn("machine_learning/venv/bin/python3", [
        "machine_learning/app.py",
      ]);

      let python_output = "";
      let python_error = "";

      console.log("-> Node.js starting Python process...");

      python_process.stdin.write(JSON.stringify(input_data));
      python_process.stdin.end();

      python_process.stdout.on("data", (data) => {
        python_output += data.toString();
      });

      python_process.stderr.on("data", (data) => {
        python_error += data.toString();
      });

      python_process.on("close", (code) => {
        if (code !== 0) {
          console.error(`<- Python process exited with code ${code}.`);
          console.error("Error Details:", python_error);
          // Tolak Promise dengan error
          return reject(
            new Error(
              `Python process exited with code ${code}. Error: ${python_error}`
            )
          );
        }

        try {
          // Parse JSON output dari Python
          const result = JSON.parse(python_output);

          console.log("<- Python process finished successfully.");
          // Selesaikan Promise dengan hasil (JSON yang sudah diparse atau string mentah)
          resolve(result);
          // Jika ingin mengembalikan string mentah: resolve(python_output.toString());
        } catch (e) {
          console.error("Crawling faild, Data not foud, try another date:", e);
          console.log("Raw Output:", python_output);
          // Tolak Promise jika parsing gagal
          reject(
            new Error({
              status: 404,
              message: "Crawling faild, Data not foud, try another date",
            })
          );
        }
      });
    } catch (err) {
      console.log(err);
      reject(err); // Tolak Promise jika terjadi error saat spawn
    }
  });
}

module.exports = relation_with_py;
