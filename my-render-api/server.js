const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

<<<<<<< HEAD
// File upload config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
=======
// ALWAYS log requests
app.use((req, res, next) => {
    console.log("Request:", req.method, req.url);
    next();
});

// Safe temp folder for Render
const uploadPath = "/tmp/uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to:", uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        console.log("Filename:", name);
        cb(null, name);
>>>>>>> b3c9d1de6d0d793449c18047acb0306b8748de82
    }
});

const upload = multer({ storage });

<<<<<<< HEAD
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
=======
// TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
    res.send("API WORKING 🚀");
});

// TEST UPLOAD ROUTE
app.post("/process", upload.single("image"), (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {
            console.log("NO FILE RECEIVED");
            return res.status(400).send("No file uploaded");
        }

        console.log("FILE PATH:", req.file.path);

        // Send file back
        return res.sendFile(path.resolve(req.file.path));

    } catch (err) {
        console.log("SERVER ERROR:", err);
        return res.status(500).send("Server crash");
    }
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
>>>>>>> b3c9d1de6d0d793449c18047acb0306b8748de82
