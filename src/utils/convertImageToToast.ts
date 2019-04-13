import camvas from "./camvas"
import camera from "./camera"

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

const WIDTH = 1024
const HEIGHT = 1024

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

  const unusedCharMap = [
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

  const charMap = [
    "🥚",
    "🍞",
    "🍞",
    "🍞",
    "🧀",
    "🥑",
    "🥒",
    "🐟",
    "🍅",
    "🍳",
    " ",
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

  for (let y = 0; y < HEIGHT; y += 10) {
    for (let x = 0; x < WIDTH; x += 10) {
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

  target.clearRect(0, 0, WIDTH, HEIGHT)
  target.beginPath()

  // console.log("%c" + characters, "font-size: 5px")
  target.font = "12px Courier"
  const lineHeight = 12
  const lines = characters.split("\n")
  for (let i = 0; i < lines.length; i++) {
    target.fillStyle = "black"
    target.fillText(lines[i], 0, 0 + i * lineHeight)
  }
}

const convertImageToToast = async () => {
  const toastCanvas = <HTMLCanvasElement>document.getElementById("toast-image")
  const toastCtx = toastCanvas.getContext("2d")

  const info = document.getElementById("info-message")
  const success = document.getElementById("success-message")
  success.style.display = "none"

  camera.init({
    width: 1000,
    height: 1000,
    fps: 30,
    mirror: true,
    // targetCanvas: toastCanvas,
    onFrame: c => {
      const ctx2 = c.getContext("2d")
      toastify(ctx2, toastCtx)
    },
    onSuccess: () => {
      info.style.opacity = "0"
      success.style.display = "block"
    },
  })

  const pauseButton = (document.getElementById("pause-button").onclick = () =>
    camera.pause())

  const startButton = (document.getElementById("resume-button").onclick = () =>
    camera.start())
}

export default convertImageToToast
