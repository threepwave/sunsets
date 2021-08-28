/* draw.js - Draw to canvas */

export const drawBuffer = function(sketch, pg) {
  // Draw anything accumulated on the buffer to the screen
  let x = 0
  let y = 0
  
  // Draw the buffer onto the screen
  sketch.image(pg, x, y)
}

export const drawSunset = function(sketch, pg, features) {
  // Setup our sign
  sketch.push()
  sketch.translate(sketch.width / 2, sketch.height / 2)

  if(features.geometry) {
    drawGeometry(sketch, pg)
  }
  
  sketch.pop()
}

const drawGeometry = function(sketch, pg) {
  // Draw initial geometry
  sketch.stroke('white')
  sketch.strokeWeight(1.5)
  sketch.noFill()
  sketch.rect(-50, -50, 100, 100, 10)
}
