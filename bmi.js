const express = require("express");


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname));


app.get("/", (req, res) => {
res.sendFile("bmi.html", { root: __dirname });
});


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

  
  res.redirect(
    `/bmiresult.html?bmi=${bmiValue}&category=${category}&class=${className}`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
