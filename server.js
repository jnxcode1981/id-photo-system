const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
========================================
UPLOAD CONFIG (RENDER SAFE)
========================================
Use /tmp (Render-compatible storage)
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

/*
========================================
HEALTH CHECK
========================================
*/
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

/*
========================================
MAIN PROCESS ENDPOINT
========================================
Receives:
- image
- package
- attire
*/
app.post("/process", upload.single("image"), (req, res) => {
    try {

        console.log("=== NEW REQUEST ===");
        console.log("PACKAGE:", req.body.package);
        console.log("ATTIRE:", req.body.attire);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        const filePath = path.join("/tmp", req.file.filename);

        // IMPORTANT: send processed file (currently raw image)
        res.sendFile(filePath);

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).send("Server error");
    }
});

/*
========================================
START SERVER
========================================
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});