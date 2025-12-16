const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// parse form data
app.use(express.urlencoded({ extended: true }));

// allow static files (html, css)
app.use(express.static(__dirname));

// show main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "bmi.html"));
});

// handle BMI calculation
app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.send("Invalid input");
  }

  const bmi = weight / (height * height);
  const bmiValue = bmi.toFixed(2);

  let category = "";
  let className = "";

  if (bmi < 18.5) {
    category = "Underweight";
    className = "underweight";
  } else if (bmi < 24.9) {
    category = "Normal weight";
    className = "normal";
  } else if (bmi < 29.9) {
    category = "Overweight";
    className = "overweight";
  } else {
    category = "Obese";
    className = "obese";
  }

  // redirect with query params
  res.redirect(
    `/bmiresult.html?bmi=${bmiValue}&category=${category}&class=${className}`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
