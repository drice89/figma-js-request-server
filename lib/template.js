exports.reactTemplate = (name, component) => {
  const headers = "import React from 'react';"
  const body = `
    function ${name} = () => {

      return (
        <div>
          ${component}
        <div>
      ) 
    }
  `

  return [headers, body]
}