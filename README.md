# Spotify track saver

A tool to get tracks' information from a playlist using the spotify API.

## Run the script

* edit `API_KEY`, `PLAYLIST_ID`, `ROOM_NAME`
* `npm install`
* `node .`

## Save to mongodb

edit `dev_db_url` in the `index.js` file with your mongodb url.

## Generated Track

* `artist` : The artist(s) of the track
* `title` : The name of the song
* `picture` : Track picture
* `preview` : 30s track preview link
