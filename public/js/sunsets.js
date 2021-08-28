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

  console.log(data)

  let pg  // Draw buffer

  sketch.setup = () => {
    /* Setup randonization */
    const R = getRandFunction(data.hash)  // Random function we can call to get a random number

    /* Create hashes for each section */
    window.features = setupFeatures(R, data, test)  // Define the features of this mint

    /* Setup Canvas */
    const aspectRatio = data.aspectRatio ? data.aspectRatio : 2 // HACK - Canvas should fill roughly half of the screen
    pg = setupCanvas(aspectRatio)  // Returns a drawbuffer we can write to
  }
  
  sketch.draw = () => {
    sketch.background(30) // Clear the canvas with every frame

    drawSunset(sketch, pg, window.features)
    drawBuffer(sketch, pg)
  }

  /* Setup Canvas */
  function setupCanvas(aspectRatio) {
    const smallerDimension = sketch.windowWidth < sketch.windowHeight ? sketch.windowWidth : sketch.windowHeight;
    sketch.createCanvas(smallerDimension / aspectRatio, smallerDimension / aspectRatio);

    const pg = sketch.createGraphics (smallerDimension / aspectRatio, smallerDimension / aspectRatio);
    pg.smooth()

    pg.translate(sketch.width / 2, sketch.height / 2) // Center (0, 0) in middle of canvas
    return(pg)
  }  

}, 'render')