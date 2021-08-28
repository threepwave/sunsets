/* draw.js - Draw to canvas */

export const drawSunset = function(sketch, pg, features) {
  // Setup our sunset
  sketch.push()
  sketch.translate(sketch.width / 2, sketch.height / 2) // Place 0, 0 at middle of screen

  drawBackground(sketch, pg)

  if(features.geometry) {
    drawOutline(sketch, pg)
    drawSun(sketch, pg)
  }
  
  sketch.pop()
}

const drawSun = function(sketch, pg) {
  // Draw the sunny backdrop
  const endColor = sketch.color(311, 92, 70, 0.97)
  const startColor = sketch.color(311, 45, 85, 0.97)

  // const startColor = sketch.color('black')
  // const endColor = sketch.color('white')
  const borderWidth = 15  // How wide should the border around the sun be?
  drawGradient(sketch, pg, 0, 0, 200 - borderWidth, 200 - borderWidth, startColor, endColor)
}

const drawOutline = function(sketch, pg) {
  // Draw small outline border around the sunset
  const fillColor = sketch.color('black')
  const strokeColor = sketch.color('white')

  pg.push()
  pg.stroke(strokeColor)
  pg.strokeWeight(7)
  pg.fill(fillColor)
  pg.circle(0, 0, 200)
  pg.pop()
}

const drawGradient = function(sketch, pg, x, y, width, height, startColor, endColor) {
  pg.push()

  for(let i = height; i > 0; i--){
      let percentage = i / height   // How far along in the gradient are we?
      let color = sketch.lerpColor(startColor, endColor, percentage)
      pg.stroke(color)
      pg.circle(0, 0, i);

      console.log(`radius: ${i}  percentage: ${i / height}  color: ${color.value}`)
  }
  pg.pop()

}

const drawBackground = function(sketch, pg) {
  // Render background to canvas
  const bgColors = [
    sketch.color(46, 21, 95), // Beige
    sketch.color(153, 21, 95) // Seafoam Green
  ]
  pg.background(bgColors[1])
}

export const drawBuffer = function(sketch, pg) {
  // Draw anything accumulated on the buffer to the screen
  let x = 0
  let y = 0
  
  // Draw the buffer onto the screen
  sketch.image(pg, x, y)
}

