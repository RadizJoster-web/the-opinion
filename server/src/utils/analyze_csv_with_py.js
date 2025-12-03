const { spawn } = require("child_process");

async function analyze_csv_with_py(file_name) {
  return new Promise((resolve, reject) => {
    try {
      const python_process = spawn("./machine_learning/venv/bin/python3", [
        "machine_learning/analyze_csv.py",
      ]);

      let python_output = "";
      let python_error = "";

      console.log("-> Node.js starting Python process for CSV analysis...");

      python_process.stdin.write(JSON.stringify({ file_name: file_name }));
      python_process.stdin.end();

      python_process.stdout.on("data", (data) => {
        python_output += data.toString();
      });

      python_process.stderr.on("data", (data) => {
        python_error += data.toString();
      });

      python_process.on("close", (code) => {
        if (code !== 0) {
          console.error(
            `Python process exited with code ${code}: ${python_error}`
          );
          return reject(new Error(`Python process exited with code ${code}`));
        }

        try {
          const parsed_output = JSON.parse(python_output);
          resolve(parsed_output);
        } catch (parseError) {
          reject(
            new Error("Failed to parse Python output: " + parseError.message)
          );
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = analyze_csv_with_py;
