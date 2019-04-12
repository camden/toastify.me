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

const WIDTH = 200
const HEIGHT = 200

const getBase64Image = async (): Promise<string> => {
  const data = await fetch(`https://placekitten.com/${WIDTH}/${HEIGHT}`).then(
    res => res.blob()
  )

  const base64 = await convertBlobToBase64(data)

  console.log(base64)
  return base64
}

const getColorIndicesForCoord = (x, y, width) => {
  const startIdx = (y * width + x) * 4

  return {
    r: startIdx,
    g: startIdx + 1,
    b: startIdx + 2,
    a: startIdx + 3,
  }
}

const bound = (value, interval) => {
  return Math.max(interval[0], Math.min(interval[1], value))
}

const getCharacterForColor = color => {
  const contrast = 128
  const brightness = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b
  const brightnessRatio = brightness / 255

  const charMap = [
    "⚪",
    "🐇",
    "🌝",
    "🥞",
    "🍈",
    "🍐",
    "🍏",
    "💧",
    "🔵",
    "🌚",
    "⚫",
  ]

  const char =
    charMap[
      charMap.length - 1 - Math.round(brightnessRatio * (charMap.length - 1))
    ]

  return char
}

const toastify = (
  ctx: CanvasRenderingContext2D,
  target: CanvasRenderingContext2D
) => {
  // Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
  // Heavily modified by Andrei Gheorghe (http://github.com/idevelop)
  // Heavily modified on top of that by Camden Bickel https://github.com/camden

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const colorData = imageData.data

  let characters = ""

  for (let y = 0; y < HEIGHT; y += 2) {
    for (let x = 0; x < WIDTH; x += 2) {
      const colorIdx = getColorIndicesForCoord(x, y, WIDTH)
      const color = {
        r: colorData[colorIdx.r],
        g: colorData[colorIdx.g],
        b: colorData[colorIdx.b],
        a: colorData[colorIdx.a],
      }

      const char = getCharacterForColor(color)
      characters += char
    }

    characters += "\n"
  }

  ctx.putImageData(imageData, 0, 0)

  // console.log("%c" + characters, "font-size: 5px")
  target.font = "8px Courier"
  const lineHeight = 8
  const lines = characters.split("\n")
  for (let i = 0; i < lines.length; i++) {
    target.fillStyle = "black"
    target.fillText(lines[i], 0, 0 + i * lineHeight)
  }
}

const convertImageToToast = async () => {
  const imgBase64 = await getBase64Image()

  const canvas = <HTMLCanvasElement>document.getElementById("normal-image")
  const ctx = canvas.getContext("2d")

  const toastCanvas = <HTMLCanvasElement>document.getElementById("toast-image")
  const toastCtx = toastCanvas.getContext("2d")

  canvas.style.display = "none"

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const img = new Image()
  img.src = imgBase64

  ctx.drawImage(img, 0, 0)

  toastify(ctx, toastCtx)
}

export default convertImageToToast
