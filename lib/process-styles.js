// The api sends fills and strokes in an array. Each item can have a different blendMode and a different type - blend mode is screen, multiple, etc (background-blend-mode or mix-blend-mode) - type is linear, radial, etc gradients
// Need to add a layers property. Processed CSS should then output an array of layers that then can be used to determine the number 


class Styles {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.type = data.type;
    this.blendMode = data.blendMode;
    this.absoluteBoundingBox = this.processAbsoluteBoundingBox(data.absoluteBoundingBox);
    this.fills = this.processFills(data.fills);
    this.stroke = this.processStroke(data.strokeWeight, data.strokes, data.strokeAlign);
    this.processCss = () => {
      return `const = userStyles = createUseStyles({${this.id} {${this.fills} ${this.absoluteBoundingBox} ${this.stroke}}})`
    } 
    this.processedCss = this.processCss().replace(/(\r\n|\n|\r)/gm, "");
  }

  //private methods
  processColor(colorObj, opacity=1) {
    return `background: rgba(r:${colorObj.r}, g:${colorObj.g}, b:${colorObj.b}, a:${opacity});`
   }

   processBlendMode(index, blendMode) {
    if(index === 0) return `background-blend-mode: ${blendMode.toLowerCase()};`
    return `mix-blend-mode: ${blendMode.toLowerCase()};`
  }

  processGradient(gradientType, angle, gradientStops) {
    return `background: ${gradientType}-gradient(${angle}, ${this.processGradientStops(gradientStops)});`
  }
  
  processGradientStops(gradientStops) {
    let processedString = []
    gradientStops.forEach(obj => {
      processedString.push(`rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a}) ${obj.position}% `)
    });
    return processedString.join(",")
  }
 
  processAbsoluteBoundingBox(obj){
    return `transform: translate(${obj.x}, ${obj.y}); width: ${obj.width}; height: ${obj.height};`
  }

  processFills(arr) {
    let store = ''
    for(let i = 0; i < arr.length; ++i) {
      let layer = ""
      let fillObj = arr[i];
      let fill;
      let blendMode;
      switch(fillObj.type) {
        case 'SOLID':
          fill = this.processColor(fillObj.color, fillObj.opacity || 1);
          blendMode = this.processBlendMode(i, fillObj.blendMode);
          layer += fill + " " + blendMode;
          break;
        case 'GRADIENT_LINEAR':
          fill = this.processGradient(fillObj.type.split("_")[0].toLowerCase(), '90deg', fillObj.gradientStops);
          blendMode = this.processBlendMode(i, fillObj.blendMode);
          layer += fill + " " + blendMode;
          break;
      }
      store += layer
    }
    //needs to be modified to process multiple fills
    return store
  }

  processStroke(strokeWeight, strokes, stokeAlign) {
    let res = []
    strokes.forEach((strokeObject) => {
      res.push(`border: ${strokeWeight}px ${strokeObject.type.toLowerCase()} rgba(r:${strokeObject.color.r}, g:${strokeObject.color.g}, b:${strokeObject.color.b}, a:${strokeObject.color.a});`);
    })
    return res.join(" ")
  }

}


module.exports = Styles;
