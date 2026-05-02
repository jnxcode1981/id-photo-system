const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

// Create uploads folder safely (Render-safe)
const uploadPath = "/tmp/uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config (Render-safe temp storage)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Test route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// PROCESS ROUTE
app.post("/process", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        console.log("File received:", req.file.filename);

        // Return the uploaded file back (safe test mode)
        res.sendFile(req.file.path);

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).send("Server processing error");
    }
});

// Render port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
