const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60e9a0d5027856111424a16e',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum consectetur quaerat similique voluptatum nemo cumque, adipisci, incidunt est, aliquid nobis fuga accusamus quas. Officia facere est velit enim iusto!',
            price: price,
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ] 
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/ddengcloud/image/upload/v1625985304/YelpCamp/dcfv1hb3dhnyulhvxi51.jpg',
                    filename: 'YelpCamp/dcfv1hb3dhnyulhvxi51'
                },
                {
                    url: 'https://res.cloudinary.com/ddengcloud/image/upload/v1625985306/YelpCamp/gs0odvq6ypqgjmbk2bom.jpg',
                    filename: 'YelpCamp/gs0odvq6ypqgjmbk2bom'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})