import sharp from 'sharp';
import {
  v4 as uuidv4
} from 'uuid';
import fs from 'fs';
import deepai from 'deepai';
import stream from 'stream';

deepai.setApiKey(process.env.DEEPAI_KEY);


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default async function (req, res, next) {
  if (req.method !== 'POST' || !req.file) {
    res.statusCode = 400;
    res.end('{"error": "image required for request"}');
  }
  try {
    let input = sharp(req.file.buffer);
    let metadata = await input.metadata();
    let noise_array = new Array(metadata.height * metadata.width * metadata.channels);
    for (var i = 0; i < noise_array.length; i++) {
      noise_array[i] = getRandomInt(256);
    }
    let noise_buffer = Buffer.from(noise_array);
    let noise = sharp(noise_buffer, {
      raw: {
        height: metadata.height,
        width: metadata.width,
        channels: metadata.channels
      }
    });
    // noise.linear(0);
    let noise_name = `noise_tmp_${uuidv4()}.png`;
    let noise_temp = await noise.png().toBuffer();
    input = input.composite([{
      input: noise_temp,
      blend: "color-burn"
    }]);
    let new_image = await input.sharpen().png().toBuffer()
    // fs.unlinkSync(noise_name);
    var resp = await deepai.callStandardApi("image-similarity", {
      image1: req.file.buffer,
      image2: new_image,
    });
    resp['image'] = new_image.toString('base64');
    res.end(JSON.stringify(resp));
  } catch (e) {
    res.end(`{error: ${e}}`)
  }
}
