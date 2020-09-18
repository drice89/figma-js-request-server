exports.componentProcessor = (figmaComponent) => {
  switch(figmaComponent.type){
    case "RECTANGLE":
        processRectangle(figmaComponent)
      break;
    default:
      return;
  }
}

const processRectangle = (rectangle) => {
  console.log(rectangle)
  console.log(rectangle.fills[1].gradientStops[0].color)
}