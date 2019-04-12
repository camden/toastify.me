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
  const data = await fetch("https://placekitten.com/200/200").then(res =>
    res.blob()
  )

  const base64 = await convertBlobToBase64(data)

  console.log(base64)
  return base64
}

const WIDTH = 200
const HEIGHT = 200

const handleMouseMove = (ctx: CanvasRenderingContext2D, event) => {
  const { layerX: mouseX, layerY: mouseY } = event

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const pixel = ctx.getImageData(mouseX, mouseY, 1, 1)
  const colorData = pixel.data
  const [r, g, b, a] = colorData

  var grayscale = function() {
    for (var i = 0; i < colorData.length; i += 4) {
      var avg = (colorData[i] + colorData[i + 1] + colorData[i + 2]) / 3
      colorData[i] = avg // red
      colorData[i + 1] = avg // green
      colorData[i + 2] = avg // blue
    }
    ctx.putImageData(imageData, 0, 0)
  }

  grayscale()

  console.log(
    "%c[]",
    `background-color: rgba(${r}, ${g}, ${b}, ${a}); font-size: 40px;`
  )
}

const convertImageToToast = async () => {
  const imgBase64 = await getBase64Image()

  const canvas = <HTMLCanvasElement>document.getElementById("normal-image")
  const ctx = canvas.getContext("2d")
  canvas.addEventListener("mousemove", (...args) =>
    handleMouseMove(ctx, ...args)
  )

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "blue"
  ctx.fillRect(0, 0, 100, 200)

  const img = new Image()
  img.src = imgBase64

  ctx.drawImage(img, 0, 0)

  const imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  console.log(imgData)
}

export default convertImageToToast
