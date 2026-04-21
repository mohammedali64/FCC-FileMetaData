var express = require('express');
var cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const path = require('path');

var app = express();

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Home page
app.get('/', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

// File upload API
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
