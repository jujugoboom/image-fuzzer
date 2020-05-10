# image-scrambler

> Image scrambler to defeat image matching censorship

Was inspired by (this)[https://citizenlab.ca/2020/05/we-chat-they-watch/] to create a small app to attempt to evade image detection.
Should help beat image detection that uses both hashes of the image, as well as AI image similarity algorithms. Uses DeepAi's 
(image similarity)[https://deepai.org/machine-learning-model/image-similarity] api to give estimates of how similar an AI thinks
the resulting image is to the originally provided image.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
