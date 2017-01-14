# imagemin-guetzli

> [Guetzli](https://github.com/google/guetzli) imagemin plugin


## Install

```
$ npm install --save imagemin-guetzli
```


## Usage

```js
const imagemin = require('imagemin');
const imageminGuetzli = require('imagemin-guetzli');

imagemin(['images/*.{png,jpg}'], 'build/images', {
    use: [
        imageminGuetzli({quality: 95})
    ]
}).then(() => {
    console.log('Images optimized');
});
```
###Note: 
When using this plugin or guetzli-bin CLI, the original filename+ext is used as the output, although the image format has changed. You have to rename the file with the correct file extension (JPG) yourself afterwards.

## API

### imageminGuetzli([options])(buffer)

#### options

Type: `object`

##### quality

Type: `number` (0–100)<br>
Default: `95`

Set quality in units equivalent to libjpeg quality. As per guetzli function, it is not recommended to go below `84`.

Please note that JPEG images do not support alpha channel (transparency). If the input is a PNG with an alpha channel, it will be overlaid on black background before encoding.


## License

MIT © [imagemin](https://github.com/imagemin)

Much original code structure from imagemin-zopfli maintainers: @kevva @sindresorhus @shinnn