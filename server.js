const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create folder if not exists
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const app = express();
const port = 3000;

// Setup multer to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Uploading to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name will be timestamped
  }
});

const upload = multer({ storage: storage });

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload and form submission
app.post('/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  if (req.file) {
    // Here you could store the data in a database, if necessary
    console.log('Uploaded file:', req.file);
    console.log('Title:', title);
    console.log('Description:', description);
  }
  // After upload, redirect back to the upload page (reset form)
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
