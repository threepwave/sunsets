import { setupFeatures, getRandFunction} from './components/features.js'
import { drawBuffer, drawSunset } from './components/draw.js'

// const container = 
new p5( (sketch) => {

  // Read hash from tokenData. Supports multiple or single hashes passed
  let data

  let test = false
  try{
    if(tester){
      test = true
    }
  } catch(error){
  }

  if(Array.isArray(tokenData)) {
    data = tokenData.pop()
  } else {
    data = tokenData 
  }

  let pg  // Draw buffer

  /* Animation */
  let sunPosition = {
    startX: -50,
    endX: 50,
    startY: 25,
    endY: -250,
    dirX: 1,  // Right
    dirY: 1   // Up
  }
  sunPosition.x = sunPosition.startX
  sunPosition.y = sunPosition.startY
  

  sketch.setup = () => {
    /* Setup randonization */
    const R = getRandFunction(data.hash)  // Random function we can call to get a random number

    /* Create hashes for each section */
    window.features = setupFeatures(R, data, test)  // Define the features of this mint

    /* Setup Canvas */
    const aspectRatio = data.aspectRatio ? data.aspectRatio : 2 // HACK - Canvas should fill roughly half of the screen
    pg = setupCanvas(aspectRatio)  // Returns a drawbuffer we can write to

    console.log(window.features)
  }
  
  sketch.draw = () => {
    sketch.background(30) // Clear the canvas with every frame
    if(sunPosition.dirX == 1) {
      sunPosition.x += 1
    } else {
      sunPosition.x -= 1
    }
    if(sunPosition.dirY == 1) {
      sunPosition.y -= 2
    } else {
      sunPosition.y += 2
    }

    if(sunPosition.x >= sunPosition.endX) {
      sunPosition.dirX = -1
    } else if(sunPosition.x <= sunPosition.startX) {
      sunPosition.dirX = 1
    }
    if(sunPosition.y <= sunPosition.endY) {
      sunPosition.dirY = -1
    } else if(sunPosition.x >= sunPosition.startY) {
      sunPosition.dirY = 1
    }


    console.log(`x: ${sunPosition.x}, y: ${sunPosition.y} dirX: ${sunPosition.dirX} dirY: ${sunPosition.dirY}`)

    drawSunset(sketch, pg, window.features, sunPosition)
    drawBuffer(sketch, pg)

    // sketch.noLoop() // HACK - pause animation to make it easier to debug
  }

  /* Setup Canvas */
  function setupCanvas(aspectRatio) {
    const smallerDimension = sketch.windowWidth < sketch.windowHeight ? sketch.windowWidth : sketch.windowHeight;
    sketch.createCanvas(smallerDimension / aspectRatio, smallerDimension / aspectRatio);

    const pg = sketch.createGraphics (smallerDimension / aspectRatio, smallerDimension / aspectRatio);
    pg.smooth()

    sketch.colorMode(sketch.HSB)

    pg.translate(sketch.width / 2, sketch.height / 2) // Center (0, 0) in middle of canvas
    return(pg)
  }  

}, 'render')