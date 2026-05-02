const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// MAIN ENDPOINT
app.post("/process", (req, res) => {
  try {
    const data = req.body;

    // Example processing (you can modify this later)
    const response = {
      message: "Data received successfully",
      receivedData: data,
      status: "OK"
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({
      message: "Error processing request",
      error: error.message
    });
  }
});

// PORT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});