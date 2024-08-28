// create web server
const express = require('express');
const app = express();

// create a route
app.get('/comments', (req, res) => {
  res.send('This is the comments page.');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});