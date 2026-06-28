const express = require('express');
const multer = require('multer');
const musicsController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

router.post('/create', authMiddleware.authArtist, upload.single('file'), musicsController.createMusic);
router.post('/album', authMiddleware.authArtist, musicsController.addMusicToAlbum);
router.get('/all', authMiddleware.authUser, musicsController.getMusic);
router.get('/albums', authMiddleware.authUser, musicsController.getAllAlbums);
router.get('/album/:albumId', authMiddleware.authUser, musicsController.getAlbumById);

module.exports = router;