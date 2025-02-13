// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('spotify');

// Create a new document in the collection.
db.getCollection('Song').insertOne({
        title: "Rooh",
        artist: "Honey Singh",
        url: "https://pagalfree.com/musics/320-Rooh%20-%20Yo%20Yo%20Honey%20Singh%20320%20Kbps.mp3"
});
