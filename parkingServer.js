const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const _=require('lodash');

const app = express();


var freeS = 15;
var freeSlots = freeS.toString();
const server = http.createServer((req,res)=>{

  //loadash
  const num = _.random(0,20);
  console.log(num);

  //set header content type

  res.setHeader('Content-type','text/html');

  //send HTML file
  let path = './test/';
  switch(req.url){
    case '/':
      path += 'firstWebPage.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }
  fs.readFile(path,(err,data)=> {
    if(err)
    {
      console.log(err);
      res.end();
    }
    else {
      res.write('<p>freeSlots:<p>'+freeSlots);
      res.write(data);
      res.end();
    }
  })

});

server.listen(3000,'localhost',() =>{
  console.log('listening for requests on port 3000');
});
