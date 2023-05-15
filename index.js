const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const { password } = require('./config.json');
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => res.sendFile(__dirname + '/startpage/index.html'));
app.get('/index.css', (req, res) => res.sendFile(__dirname + '/startpage/index.css'));
app.get('/index.html', (req, res) => res.sendFile(__dirname + '/startpage/index.html'));
app.get('/sudo.html', (req, res) => res.sendFile(__dirname + '/sudoportal/index.html'));
app.get("/sudo2.html", (req, res) => {
    console.log(req.cookies)
    if(req.cookies.loggedin) {
        res.sendFile(__dirname + '/sudoportal/oiawdjadjuih.html');
        console.log("approved+sent")
    } else {
        res.sendFile(__dirname + '/sudoportal/index.html');
        console.log("denied+sent")
    }
})
app.get('/game.html', (req, res) => res.sendFile(__dirname + '/game/index.html'));
app.get("background.png", (req, res) => res.sendFile(__dirname + '/game/background.png'));

// Variable to store the data object
let dataObject = {};

app.get('/data.js', (req, res) => {
  let userData = req.query;
    console.log(userData)
  // Iterate over the userData array
    const dice = userData.dice;
    const name = userData.name;
    if (dataObject[name]) {
      // If the player already exists, add the dice value
      dataObject[name].position += parseInt(dice);
      dataObject[name].rolled = true;
    } else {
      // If the player doesn't exist, create a new entry
      dataObject[name] = { position: parseInt(dice), rolled:true};
    }
  // Log the updated data object
  console.log(dataObject);

  // Send a response
  res.send('Data processed successfully');
});
app.get("/checkroll.js", (req, res) => {
    let userData = req.query;
    const name = userData.name;
    if (dataObject[name]) {
        if(dataObject[name].rolled ==true) {
           res.sendStatus(401)
        }else{
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(200)
    }
})
app.get('/reset.js', (req, res) => {
    for (user in dataObject) {
        dataObject[user].rolled = false;
    }
})
// Start the server



app.listen(port, () => console.log(`Example app listening on port ${port}!`));