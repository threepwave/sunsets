/* draw.js - Draw to canvas */

export const drawSunset = function(sketch, pg, features) {
  // Setup our sunset
  sketch.push()
  sketch.translate(sketch.width / 2, sketch.height / 2) // Place 0, 0 at middle of screen

  if(features.geometry) {
    drawSun(sketch, pg, features.sunColors)
    drawOcean(sketch, pg, features.oceanColors)
    drawLines(sketch, pg)
    drawOutline(sketch, pg)
  }

  drawBackground(sketch, pg, features.bgColor)
  
  sketch.pop()
}

const drawSun = function(sketch, pg, sunColors) {
  // Draw the sunny backdrop
  const startColor = sketch.color(sunColors.start)
  const endColor = sketch.color(sunColors.end)

  const borderWidth = 15  // How wide should the border around the sun be?
  drawRadialGradient(sketch, pg, 30, -20, 300 - borderWidth, startColor, endColor)
}

const drawOcean = function(sketch, pg, oceanColors) {
  // Draw the sunny backdrop
  const startColor = sketch.color(oceanColors.start)
  const endColor = sketch.color(oceanColors.end)

  drawLinearGradient(sketch, pg, -pg.width / 2, 31, pg.width, 60, startColor, endColor)
}

const drawLines = function(sketch, pg) {
  // Draw lines representing the horizon or reflections
  let height = 8

  pg.push()
  pg.fill(sketch.color('black'))
  pg.noStroke()
  pg.rect(-pg.width / 2, 30, pg.width, height)
  pg.rect(-pg.width / 2, 53, pg.width, height)
  pg.rect(-pg.width / 2, 74, pg.width, height)
  pg.pop()
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
  pg.strokeWeight(7)
  pg.stroke(strokeColor)
  pg.circle(0, 0, 188)

  pg.pop()
}

const drawBackground = function(sketch, pg, bgColor) {
  // Render background to canvas

  // We use transparent fill so we can overwrite everything underneath and just stack on top
  const fillColor = sketch.color(0, 0, 0, 0)
  pg.push()
  pg.fill(fillColor)

  let strokeColor = sketch.color(bgColor)
  pg.stroke(strokeColor)
  pg.strokeWeight(500)
  pg.circle(0, 0, 286)
  pg.pop()
}

/* Utility Functions */

const drawRadialGradient = function(sketch, pg, x, y, radius, startColor, endColor) {
  // Draw a circular gradient radiating out from a point
  pg.push()

  for(let i = radius; i > 0; i--){
      let percentage = i / radius   // How far along in the gradient are we?
      let color = sketch.lerpColor(startColor, endColor, percentage)
      pg.stroke(color)
      pg.circle(x, y, i);
  }
  pg.pop()
}

const drawLinearGradient = function(sketch, pg, x, y, width, height, startColor, endColor) {
  // Draw a line-based gradient in a single direction
  pg.push()
  for(let i = height; i > 0; i--){
    let percentage = i / height   // How far along in the gradient are we?
    let color = sketch.lerpColor(startColor, endColor, percentage)
    pg.stroke(color)
    pg.rect(x, y, width, i);
  }
pg.pop()
}

export const drawBuffer = function(sketch, pg) {
  // Draw anything accumulated on the buffer to the screen
  let x = 0
  let y = 0
  
  // Draw the buffer onto the screen
  sketch.image(pg, x, y)
}

