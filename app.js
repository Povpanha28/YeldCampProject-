const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const Campground = require('./models/camground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, (this option is deprecated from mongoose 6.0.0)
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Database connected!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("home");
}
);

app.get('/makecampground', async(req, res) => {
    const camp = new Campground({
        title: 'My Backyard',
        price: '100',
        description: 'Cheap camping in my backyard',
        location: 'My House, USA'
    });
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
