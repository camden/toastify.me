// https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897
const convertBlobToBase64 = (blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(String(reader.result))
    }
    reader.readAsDataURL(blob)
  })

const getBase64Image = async (): Promise<string> => {
  const data = await fetch("https://placekitten.com/50/50").then(res =>
    res.blob()
  )

  const base64 = await convertBlobToBase64(data)

  console.log(base64)
  return base64
}

const WIDTH = 50
const HEIGHT = 50

const getColorIndicesForCoord = (x, y, width) => {
  const startIdx = (y * width + x) * 4

  return {
    r: startIdx,
    g: startIdx + 1,
    b: startIdx + 2,
    a: startIdx + 3,
  }
}

const handleMouseMove = (ctx: CanvasRenderingContext2D, event) => {
  const { layerX: mouseX, layerY: mouseY } = event

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const colorData = imageData.data

  var grayscale = function() {
    for (var i = 0; i < colorData.length; i += 4) {
      var avg = (colorData[i] + colorData[i + 1] + colorData[i + 2]) / 3
      colorData[i] = colorData[i] + 1 // red
      colorData[i + 1] = colorData[i + 1] - 1 // green
      colorData[i + 2] = colorData[i + 2] + 1 // blue
    }
    ctx.putImageData(imageData, 0, 0)
  }
}

const bound = (value, interval) => {
  return Math.max(interval[0], Math.min(interval[1], value))
}

const getCharacterForColor = ({ r, g, b, a }) => {
  const contrast = 128
  return "O"
}

const toastify = (ctx: CanvasRenderingContext2D) => {
  // Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
  // Heavily modified by Andrei Gheorghe (http://github.com/idevelop)
  // Heavily modified on top of that by Camden Bickel https://github.com/camden

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const colorData = imageData.data

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const colorIdx = getColorIndicesForCoord(x, y, WIDTH)
      const color = {
        r: colorData[colorIdx.r],
        g: colorData[colorIdx.g],
        b: colorData[colorIdx.b],
        a: colorData[colorIdx.a],
      }

      console.log(color)
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

const convertImageToToast = async () => {
  const imgBase64 = await getBase64Image()

  const canvas = <HTMLCanvasElement>document.getElementById("normal-image")
  const ctx = canvas.getContext("2d")

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "blue"
  ctx.fillRect(0, 0, 100, 200)

  const img = new Image()
  img.src = imgBase64

  ctx.drawImage(img, 0, 0)

  toastify(ctx)
}

export default convertImageToToast
