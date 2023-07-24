const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const upload = require('./middleware/upload')

// Controllersca
const userController = require('./controllers/userController')
const createController = require('./controllers/createController')

mongoose.connect('mongodb+srv://admin:123@cluster0.tvmv4gc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB ")
}).catch((error) => {
    console.error(error)
})

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',userController)
app.post('/create',upload.single('image'),createController)

const PORT = 8080;
app.listen(PORT, () => console.log(`API Listening on PORT ${PORT}`));
