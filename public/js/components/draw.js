/* draw.js - Draw to canvas */

export const drawSunset = function(sketch, pg, features) {
  // Setup our sunset
  sketch.push()
  sketch.translate(sketch.width / 2, sketch.height / 2) // Place 0, 0 at middle of screen

  if(features.geometry) {
    drawSun(sketch, pg)
    drawLines(sketch, pg)
    drawOutline(sketch, pg)
  }

  drawBackground(sketch, pg)
  
  sketch.pop()
}

const drawSun = function(sketch, pg) {
  // Draw the sunny backdrop
  const endColor = sketch.color(311, 92, 70, 0.97)
  const startColor = sketch.color(311, 45, 85, 0.97)

  const borderWidth = 15  // How wide should the border around the sun be?
  drawGradient(sketch, pg, 30, -20, 300 - borderWidth, startColor, endColor)
}

const drawLines = function(sketch, pg) {
  // Draw lines representing the horizon or reflections
  
}

const drawOutline = function(sketch, pg) {
  // Draw small outline border around the sunset
  // We use transparent fill so we can overwrite everything underneath and just stack on top
  const fillColor = sketch.color(0, 0, 0, 0)
  pg.push()
  pg.fill(fillColor)

  // Draw larger white border
  let strokeColor = sketch.color('white')
  pg.strokeWeight(15)
  pg.stroke(strokeColor)
  pg.circle(0, 0, 200)

  // Draw small black border
  strokeColor = sketch.color('black')
  pg.strokeWeight(5)
  pg.stroke(strokeColor)
  pg.circle(0, 0, 188)

  pg.pop()
}

const drawGradient = function(sketch, pg, x, y, radius, startColor, endColor) {
  pg.push()

  for(let i = radius; i > 0; i--){
      let percentage = i / radius   // How far along in the gradient are we?
      let color = sketch.lerpColor(startColor, endColor, percentage)
      pg.stroke(color)
      pg.circle(x, y, i);

      console.log(`radius: ${i}  percentage: ${i / radius}  color: ${color.value}`)
  }
  pg.pop()

}

const drawBackground = function(sketch, pg) {
  // Render background to canvas

  const bgColors = [
    sketch.color(46, 21, 95), // Beige
    sketch.color(153, 21, 95) // Seafoam Green
  ]

  // We use transparent fill so we can overwrite everything underneath and just stack on top
  const fillColor = sketch.color(0, 0, 0, 0)
  pg.push()
  pg.fill(fillColor)

  let strokeColor = bgColors[1]
  pg.stroke(strokeColor)
  pg.strokeWeight(500)
  pg.circle(0, 0, 286)
  pg.pop()

}

export const drawBuffer = function(sketch, pg) {
  // Draw anything accumulated on the buffer to the screen
  let x = 0
  let y = 0
  
  // Draw the buffer onto the screen
  sketch.image(pg, x, y)
}

