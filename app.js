// Inports the required libraries and other files.
const express = require('express');
const app = express();

// Passes incoming requests to more readable formats.
app.use(express.static('./'));

// Begins listening for incoming requests.
app.listen(80);