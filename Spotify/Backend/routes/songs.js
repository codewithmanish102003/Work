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

module.exports = router;