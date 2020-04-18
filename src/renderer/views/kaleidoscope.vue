<template>
  <div>
  </div>
</template>

<script>
const p5 = require('p5')
const s = (sketch) => {
//starting diameter could be a range

let id = 0
let rotation = 0
let signals = []
let xOff = 0
let yOff = 0

class Signal {
  constructor(type, id, noiseVal) {
    this.id = id
    this.x = 0
    this.y = 10
    this.d = 20

    if(sketch.mouseIsPressed) {
      switch (type) {
        case 0:
          this.color = [255, 0, 0]
          break;
        case 1:
          this.color = [0, 255, 0]
          break;
        case 2:
          this.color = [0, 0, 255]
          break;
        default:
          this.color = [0, 0, 0]
          break;

      }
    } else {
      this.color = noiseVal * 255
    }    
  }
  

  diameterChange(noiseVal) {
    this.d += noiseVal
  }

  colorChange() {
    this.color[0] -= 0.1
  }

  positionChange() {
    this.y += 0.2
  }

  display() {
    sketch.fill(this.color)
    sketch.circle(this.x, this.y, this.d)
    // this.colorChange()
  }
}


function removeSignal(id) {
  signals.splice(signals.findIndex(function(i) {
    return i.id === id;
  }), 1);
}

function addSignal(type, id, noiseVal) {
  signals.push(new Signal(type, id, noiseVal))
  setTimeout(removeSignal, 45000, id)
}

sketch.setup = () => {
  sketch.createCanvas(800, 480);
  sketch.frameRate(30)
  sketch.angleMode(sketch.DEGREES)
}

sketch.draw = () => {
  let angle = 360 / signals.length
  let bg = sketch.noise(yOff) * 255
  sketch.background(bg);

  sketch.fill(255, 255, 255, 1)
  sketch.translate(sketch.width / 2, sketch.height / 2)

  sketch.rotate(rotation++)
  signals.forEach((signal, index) => {
    sketch.push()
    sketch.rotate(angle * index)
    signal.display()
    signal.y += 0.0001
    // if (Math.random() > 0.95) {
    //   signal.positionChange()
    // }
    signals[index].diameterChange(sketch.noise(xOff))
    sketch.pop()
  })
  xOff += 0.001
  yOff += 0.0005

  if (Math.random() > 0.995) {
    // let type = 2048
    let type = Math.floor(Math.random() * 3)
    let id = Math.floor(Math.random() * 3)
    let color = sketch.noise(yOff)
    addSignal(type, id, color)
  }
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

<style lang="sass" scoped>

</style>