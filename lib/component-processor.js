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
}