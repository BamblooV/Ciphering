const { pipeline } = require('stream');
const streams = require('./Streams/Streams')

pipeline(
  streams,
  (error) => {
    if (error) {
      console.error('Error in pipeline');
    } else {
      console.log('The line was written successfully');
      process.exit(0);
    }
  }
)