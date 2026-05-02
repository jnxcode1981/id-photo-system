const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());

// File upload config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Health check
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

/*
========================================
 MAIN PROCESS ENDPOINT
========================================
Frontend sends:
- image
- package
- attire
*/
app.post("/process", upload.single("image"), (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        console.log("Received file:", req.file.filename);
        console.log("Package:", req.body.package);
        console.log("Attire:", req.body.attire);

        /*
        ========================================
        TEMPORARY PROCESSING (SAFE VERSION)
        ========================================
        Right now we just return the SAME image back
        (this avoids errors and makes frontend work)
        */

        const imagePath = path.join(__dirname, req.file.path);

        res.sendFile(imagePath);

    } catch (error) {
        console.log(error);
        res.status(500).send("Processing error");
    }
});

// Port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});