const styleKeys = {
  absoluteBoundingBox: processAbsoluteBoundingBox,
  strokeWeight: "border"

}

exports.processStyles = (data) => {
  
}

const processAbsoluteBoundingBox = (obj) => {
  return `
    transform: translate(${obj.x}, ${obj.y})
    width: ${obj.width}
    height: ${obj.height}
  `
}