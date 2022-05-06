const fs = require('fs')
const download = require('download')
const sharp = require('sharp');

let url = 'https://pic3.zhimg.com/v2-c34d75f9479479c59055d16b1940e86b_xll.jpg'; 
    (async () => {
        let data = await download(url)
        await fs.promises.writeFile('./wymna.jpg', data)
        sharp('./wymna.jpg')
            .rotate()
            .flip()
            .avif()
            .flop()
            .toFile('./wymna.avif')
    })()

