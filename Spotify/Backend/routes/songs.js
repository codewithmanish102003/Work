const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        console.log(songs);
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Play a song
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (song == null) {
            return res.status(404).json({ message: 'Cannot find song' });
        }
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload a song
router.post('/upload', async (req, res) => {
    const { title, artist, album, url, duration } = req.body;

    const song = new Song({
        title,
        artist,
        album,
        url,
        duration
    });

    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;