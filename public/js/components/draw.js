/* draw.js - Draw to canvas */

export const drawSunset = function(sketch, pg, features) {
  // Setup our sunset
  sketch.push()
  sketch.translate(sketch.width / 2, sketch.height / 2) // Place 0, 0 at middle of screen

  drawBackground(sketch, pg)

  if(features.geometry) {
    drawOutline(sketch, pg)
  }
  
  sketch.pop()
}

const drawOutline = function(sketch, pg) {
  // Draw initial geometry
  const color = sketch.color('black')
  const strokeColor = sketch.color('white')
  pg.stroke(strokeColor)
  pg.strokeWeight(7)
  pg.fill(color)
  pg.circle(0, 0, 200, 200)
}

const drawBackground = function(sketch, pg) {
  // Render background to canvas
  const bgColor = sketch.color(46, 21, 95)
  pg.background(bgColor)
}

export const drawBuffer = function(sketch, pg) {
  // Draw anything accumulated on the buffer to the screen
  let x = 0
  let y = 0
  
  // Draw the buffer onto the screen
  sketch.image(pg, x, y)
}

