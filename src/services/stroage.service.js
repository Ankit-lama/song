const ImageKit = require('@imagekit/nodejs');

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadfile(file) {
    console.log("upload function running...");

    const result = await imagekitClient.files.upload({
        file,
        fileName: 'music_' + Date.now(),
        folder: 'playlist/musics',
    });

    return result;
}

module.exports = { uploadfile };