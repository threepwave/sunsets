import { PROB50, PROB25, PROB15, PROB10, PROB5, PROB1 } from '../data/probability.js'

/* features.js - Anything related to random number and feature calculation */

/* Seeds and Hashes */
export const setupFeatures = function (R, data, test) {
  /* Generate our initial seeds, translate them to features, and return them as an object 
  Input: R - PRNG function 
  Output:
    ???
  */
  let seeds = {}, features = {}

  /* Allow us to pass in test cases */
  if(!test) {
     /* This is normal execution path (non-test) */    
    features.geometry = true
  } else {
    /* Populate features with external test data */
    features = populateTestData(R, seeds, data)
  } 

  /* Derived functions - These cannot be passed in and are calculated from test data if provided */
  return(features)
}

export const getRandFunction = function(hash) {
  /* PRNG function - 'tx piter' !!
    Returns a function R which can called to generate a deterministic random number.

    https://discord.com/channels/411959613370400778/763407935127945226/851064365800095774
    R() triggers the RNG and returns a float between 0->1
    S = U32Int array w/ state

    Input is a hash ala 0xeca4cf6288eb455f388301c28ac01a8da5746781d22101a65cb78a96a49512c8
    */

let t, s, S, R
S = Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);
return(R)
}

const populateTestData = function(R, seeds, data) {
  let features = {}
  features = { ... data } // Copy data in to our new object
    
  return(features)
}