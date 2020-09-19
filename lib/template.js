exports.reactComponentTemplate = (name, component) => {
  const body = `

    function ${name} = () => {

      return (
        <div>
          ${component}
        <div>
      ) 
    }
  `

  return body
}

exports.importStatements = () => {
  return `
    import React from 'react';
    import {createUseStyles} from 'react-jss'
  `
}