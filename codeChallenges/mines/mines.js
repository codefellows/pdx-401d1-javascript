console.log('fs.js: Mini test app for argv, server, oppressor, file read\n');

var fs   = require('fs');
var sscanf = require('scanf').sscanf;
var utilArray = require('./utilArray.js');

var fileRawMap;
if (typeof process.argv[2] == 'undefined') {
  fileRawMap = 'mineMap2.txt';
  console.log('  Usage:\n    node '+process.argv[1].split('/').pop()+' [Mine map ASCII file]\n');
  console.log('  NOTE: No mine map ASCII file specified. Using default file "'+fileRawMap+'"\n');
} else {
  fileRawMap = process.argv[2];
}

fs.stat(fileRawMap, (err, stat) => {
  if (null == err)
    console.log('Data file '+fileRawMap+' found.');
  else {
    console.log('Data file '+fileRawMap+' not found. Using file "m4" instead.');
    fileRawMap = 'm4';
  }
});

/*-------
  Server
 -------*/
var http = require('http');
var port = 9090;
var opp = require('oppressor'); // Use compression 'cuz it's cool

var serv = http.createServer(function(req, resp) {
  fs.readFile(__dirname + '/' + fileRawMap, 'utf8',
              function(err, dat) { resp.end(buildMap(dat)); }
	     );
});
var listen = serv.listen(port);
console.log("Running server at port " + port);

/*----------
  Map logic
 ----------*/
function getCounts(bMap, w, h) { // rawMap is a String
  var cMap = utilArray.callocArray(w, h);
  var drA,drB, dcA,dcB; // Row & column ROI range "deltas", respectively
  var hm1 = h - 1; // Cache for speed
  var wm1 = w - 1; // Cache for speed

  // Inner function: didn't feel like passing bMap and cMap around
  function incrNeighbors(rC, cC) { // Center is at (rC, cC)
    for (var rN = rC+drA; rN <= rC+drB; rN++) { // Neighbor row
      for (var cN = cC+dcA; cN <= cC+dcB; cN++) { // Neighbor col
        if (! bMap[rN][cN]) { cMap[rN][cN]++; } // Increment non-mine pixels
      }
    }
  }

  for (var rr=0; rr < h; rr++) {
    drA = -(rr > 0  ); // Coercion at its best
    drB =  (rr < hm1); // Coercion at its best
    for (var cc=0; cc < w; cc++) {
      dcA = -(cc >   0); // Coercion at its best
      dcB =  (cc < wm1); // Coercion at its best -- 4th time!
      if (bMap[rr][cc]) { incrNeighbors(rr, cc); cMap[rr][cc] = '*'; }
    }
  }
  return cMap;
}

function buildMap(rawMap) { // rawMap is a String
  var rows = rawMap.split('\n');
  var size = sscanf(rows[0], '%d %d', 'h', 'w');
  var w = size['w'];
  var h = size['h'];
  var bMap = []; // Binary map: 0 = empty, 1 = "Contains a mine"

  for (var rr=1; rr <= h; rr++) {
    var tiles = rows[rr].split('').map(function(ele) { return ('*' == ele); });
    bMap.push(tiles);
  }

  // Status string
  var outStr = 'Raw data:\n'+rawMap+'\n'+'Count map:\n';
  return outStr + utilArray.print2dArray(getCounts(bMap, w,h), w,h);
}
