const path = require('path');
const portNumber = 3000;
var fs = require("fs");
var https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

const errorController = require('./controllers/error');

const alexaAPI = require('./util/taskCompletionCheck');


const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');
const say = require('say')

// Use default system voice and speed
// say.speak('Hello!')

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404);

var httpOptions = {key: privateKey, cert: certificate};
https.createServer(httpOptions, app).listen(8000, () => {
console.log(">> Serving on " + 8000);
});

alexaAPI.run();