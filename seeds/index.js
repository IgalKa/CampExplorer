const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/isra-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    console.log("we in seedDB");
    await Campground.deleteMany({});
    console.log(cities.length)
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 115);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            location: `${cities[random1000].name}, ${cities[random1000].country}`,
            title: `${cities[random1000].name}`,
            images: [
                {

                    url: 'https://res.cloudinary.com/dzmgbeqei/image/upload/v1728819105/israCamp/yhepb0xhjblsxodkygnu.jpg',
                    filename: 'israCamp/yhepb0xhjblsxodkygnu',
                },
                {
                    url: 'https://res.cloudinary.com/dzmgbeqei/image/upload/v1728819104/israCamp/wnsxn4wclttagjtpqfgk.jpg',
                    filename: 'israCamp/wnsxn4wclttagjtpqfgk',
                }
            ],
            description: `${cities[random1000].description}`,
            price: price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].coordinates.lng,
                    cities[random1000].coordinates.lat
                ],
            },
            author: '66fe73489bf1de52366e1c83',
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})