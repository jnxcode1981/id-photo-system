const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

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
    }
});

const upload = multer({ storage });

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
