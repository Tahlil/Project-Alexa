const path = require('path');
const portNumber = 3000;

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const alexaAPI = require('./util/taskCompletionCheck');
alexaAPI.run();

const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404);

console.log("Server listening at port:" + portNumber);
app.listen(portNumber);