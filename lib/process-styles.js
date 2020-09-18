// The api sends fills and strokes in an array. Each item can have a different blendMode and a different type - blend mode is screen, multiple, etc (background-blend-mode or mix-blend-mode) - type is linear, radial, etc gradients
// the way layer blending works you have to create multiple divs on top of each other or possibly use the ::after selector.
// The idea is to create a representation of each fill or stroke layer


const styleKeys = {
  absoluteBoundingBox: processAbsoluteBoundingBox,
  fills: processFills,
  

}

exports.processStyles = (data) => {
  let cssString = ""
  let style = (cssString) => {
    return `const = userStyles = createUseStyles({
      ${data.id} = ${cssString}
    })`
  } 
  Object.keys(data).forEach((key) => {
    if (key in styleKeys) cssString += styleKeys[key](data[key])
  })

  return style(cssString);
  
}



const processAbsoluteBoundingBox = (obj) => {
  return `
    transform: translate(${obj.x}, ${obj.y});
    width: ${obj.width};
    height: ${obj.height};
  `
}

const processFills = (arr) => {
  let store = ''
  for(let i = 0; i < arr.length; ++i) {
    let layer = ""
    let fillObj = arr[i];
    switch(fillObj[type]) {
      case 'SOLID':
        let fill = processColor(fillObj[color], fillObj[opacity] || 1);
        let blendMode = processBlendMode(i, fillObj[blendMode]);
        layer += fill + " " + blendMode;
        break;
      case 'GRADIENT_LINEAR':
        let fill = processGradient(fillObj[type].split("_")[0].toLowerCase(), '90deg', fillObj[gradientStops]);
        let blendMode = processBlendMode(i, fillObj[blendMode]);
        layer += fill + " " + blendMode;
        break;
    }
    store += layer
  }
  //needs to be modified to process multiple fills
  return store
}

const processColor = (colorObj, opacity=1) => {
 return `background: rgba(r:${colorObj.r}, g:${colorObj.g}, b:${colorObj.b}, a:${opacity});`
}

const processBlendMode = (index, blendMode) => {
  if(index === 0) return `background-blend-mode: ${blendMode};`
  return `mix-blend-mode: ${blendMode};`
}

const processGradient = (gradientType, angle, gradientStops) => {
  return `background: ${gradientType}-gradient(${angle}, ${processGradientStops(gradientStops)});`
}

const processGradientStops = (gradientStops) => {
  let processedString = []
  gradientStops.forEach(obj => {
    processedString.push(`rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a}) ${obj.position}%`)
  });
  return processedString.join(",")
}