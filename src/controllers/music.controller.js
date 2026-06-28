const Musics = require('../models/Music.model');
const { uploadfile } = require('../services/stroage.service');
const Album = require('../models/album.model');


async function createMusic(req, res) {
    //create a music
    const { uri, title } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await uploadfile(file.buffer.toString('base64'));
    // Do something with the upload result, e.g., save to database
    const music = await Musics.create({
        uri: result.url,
        title,
        user: req.user.id
    });
    res.status(201).json({ message: 'Music created successfully', 
        id: music._id, 
        uri: result.url ,
        title:music.title, 
        artist: req.user.id });
}

async function addMusicToAlbum(req, res) {
        const {title, musicIds} = req.body;
        const album = await Album.create({
            title: title,
            artist: req.user.id,
            Musics: musicIds
        });
        res.status(201).json({ message: 'Album created successfully',
            title: title,
            artist: req.user.id,
            Musics: musicIds
         });
}

async function getMusic(req, res) {
    const musics = await Musics.find();
    res.status(200).json({
        message: 'Musics fetched successfully',
        musics: musics
    });
}

async function getAllAlbums(req, res) {
    const albums = await Album.find().select('title artist Musics');
    res.status(200).json({
        message: 'Albums fetched successfully',
        albums: albums
    });
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId;
    const album = await Album.findById(albumId).populate('Musics');
    res.status(200).json({
        message: 'Album fetched successfully',
        album: album
    });
}
module.exports = { createMusic, addMusicToAlbum, getMusic, getAllAlbums, getAlbumById };