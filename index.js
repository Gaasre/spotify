var axios = require('axios');
var fs = require('fs');
var tracks_evolved = [];

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/quiz';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String },
    img: { type: String },
    songs: { type: Array},
});

var Room = mongoose.model('Rooms', UserSchema, 'rooms');

function updateSongs(room, song) {
    Room.find({ name: room }, (err, document) => {
        if (err) {
            console.log(err);
        } else {
            console.log(song);
            document[0].songs.push(song);
            document[0].save();
        }
    })
}

Room.find({}, (err, document) => {
    if (err) {
        console.log(err);
    } else {
        fs.writeFile("test.json", JSON.stringify(document), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
})

// Uncomment to save to file

/*for (var i = 0; i < 400; i+=100) {
    axios.get('https://api.spotify.com/v1/playlists/0hfsNLZls6QZcmn1khi0fw/tracks?limit=100&offset=' + i, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQDoPa8J2pr6Se0wWbRuaDEU6ucPkVb5yVBTEhfTIeP_JCRF-jzpKNwqZLZ5EkRRstXou29dDqYZd9tALMWUL-F-gLhS4fzlms175NkKZcc7TsLwlr9eGbXCU2B-VO1POzMFdH9XuK7mXk420bFd_c7pHMzutnWE3Qb2vw'
        }
    })
    .then(function (response) {

        var tracks = response.data.items;
        tracks.forEach(element => {
            var track = element.track;
            var added_track = {
                artist: track.artists.map((item) => item.name).join(' & '),
                title: track.name,
                picture: track.album.images[0].url,
                preview: track.preview_url
            }
            if (added_track.preview) {
                updateSongs('French music', added_track);
            }
        });
        
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}*/