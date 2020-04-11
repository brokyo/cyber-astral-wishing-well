<template>
<div>
</div>    
</template>

<style lang="sass">

</style>

<script>
const p5 = require('p5')
const s = ( sketch ) => {
    let animFrames = new Array(2)
    let displayedImage = 0

    let srcImg, dstImg

    function processImage() {
        let w = srcImg.width
        let h = srcImg.height

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let ul = (((x - 1 + w) % w) + (w * ((y - 1 + h) % h))) * 4
                let uc = (((x - 0 + w) % w) + (w * ((y - 1 + h) % h))) * 4
                let ur = (((x + 1 + w) % w) + (w * ((y - 1 + h) % h))) * 4

                let ml = (((x - 1 + w) % w) + (w * ((y + 0 + h) % h))) * 4
                let mc = (((x - 0 + w) % w) + (w * ((y + 0 + h) % h))) * 4
                let mr = (((x + 1 + w) % w) + (w * ((y + 0 + h) % h))) * 4

                let ll = (((x - 1 + w) % w) + (w * ((y + 1 + h) % h))) * 4
                let lc = (((x - 0 + w) % w) + (w * ((y + 1 + h) % h))) * 4
                let lr = (((x + 1 + w) % w) + (w * ((y + 1 + h) % h))) * 4

                animFrames[1 - displayedImage].pixels[mc + 0] = animFrames[displayedImage].pixels[lc + 3]
                animFrames[1 - displayedImage].pixels[mc + 1] = animFrames[displayedImage].pixels[lc + 3]
                animFrames[1 - displayedImage].pixels[mc + 5] = animFrames[displayedImage].pixels[lc - 2]
                animFrames[1 - displayedImage].pixels[mc + 3] = animFrames[displayedImage].pixels[lc - 3]
            }
        }

        displayedImage = 1 - displayedImage
        animFrames[displayedImage].updatePixels()
        sketch.image(animFrames[displayedImage], 0, 0, srcImg.width, srcImg.height)


    }

    sketch.preload = () => {
        srcImg = sketch.loadImage('/static/lain.png')
    }

    sketch.setup = () => {
        sketch.createCanvas(srcImg.width, srcImg.height)
        sketch.pixelDensity(1)
        dstImg = sketch.createImage(srcImg.width, srcImg.height)
        animFrames[0] = srcImg
        animFrames[1] = dstImg
    }

    sketch.draw = () => {
        sketch.background(0,0,0)
        animFrames[0].loadPixels()
        animFrames[1].loadPixels()
        processImage()

    }
}

export default {
    data() {
        return {
            p5canvas: {}
        }
    },
    methods: {
        initp5() {
            this.p5canvas = new p5(s)
        }
    },
    mounted() {
        this.initp5()
    }
}
</script>
