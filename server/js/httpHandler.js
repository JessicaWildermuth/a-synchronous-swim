const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const message = require('./messageQueue');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = [];
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
    res.writeHead(200, headers);
    res.end(message.dequeue());
    } else {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if(err) {
          res.writeHead(404, headers);
          res.end();
        } else {
          res.writeHead(200, headers);
          res.end(multipart.getFile(data));
        }
      })
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if (req.method === 'POST') {
    // check if the url exists
    if (req.url === '/background.jpg') {
      var images = [];
      // call req.on on the data and access its chunk
      req.on('data', (chunk) => {
        images.push(chunk);
      }).on('end', () => {
        images = multipart.getFile
      })
    }
    // store in a container (image)
    // .on calling end and utilize the multipartUtils methods
    console.log(req.data);
  }
  next(); // invoke next() at the end of a request to help with testing!
};
// send 'get' response data back to client side

//make a function that returns a random direction
//res.write(functionCall)
var getRandomDirection = function() {
  const directions = ['left', 'right', 'up', 'down'];
  var index = Math.floor(Math.random() * directions.length);
  return directions[index];
}