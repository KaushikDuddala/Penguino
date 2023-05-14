const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/startpage/index.html'));
app.get('/index.css', (req, res) => res.sendFile(__dirname + '/startpage/index.css'));
app.get('/index.html', (req, res) => res.sendFile(__dirname + '/startpage/index.html'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));