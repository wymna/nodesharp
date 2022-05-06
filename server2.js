// 跨平台、高性能、无运行时依赖

const sharp = require('sharp');
const fs = require('fs');



const basePicture = './wymna.jpg';

// 流转Buffer缓存
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const bufferList = []
    stream.on('data', data => {
      // 每一个data都是一个Buffer对象
      bufferList.push(data)
    })
    stream.on('error', err => {
      reject()
    })
    stream.on('end', () => {
      resolve(Buffer.concat(bufferList))
    })
  })
}


/**
 * 3、对文件流进行处理
 * @param {String} basePicture 源文件路径
 */
async function dealWithStream(basePicture) {
  // 读取文件流

  const readableStream = fs.createReadStream(basePicture)
  // 对流数据进行处理
  const transformer = sharp().resize({
    width: 200,
    height: 200,
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  })
  // 将文件读取到的流数据写入transformer进行处理
  readableStream.pipe(transformer)

  // 将可写流转换为buffer写入本地文件
  streamToBuffer(transformer).then(function(newPicBuffer) {
   
    fs.writeFile(`${__dirname}/static/1.png`, newPicBuffer, function(
      err
    ) {
      if (err) {
        console.log(err)
      }
      console.log('done')
    })
  })
}
dealWithStream(basePicture);

