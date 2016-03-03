// Utilities

function print2dArray(a, Ncols, Nrows) {
  var s = '';
  for (var rr=0; rr < Nrows; rr++) {
    for (var cc=0; cc < Ncols; cc++) { s += a[rr][cc]+' '; }
    s += '\n';
  }
  return s;
}

// Allocate a 2-D array; init all elements to zero
// Name inspired by C language's calloc()
function callocArray(Ncols, Nrows) {
  var a = [], row = [];
  while (Ncols--) row.push(0); // Fill out a single 1-D array

  // Push 'Nrow" new copies into 'a'
  // slice() is needed to avoid copying *references*
  while (Nrows--) a.push(row.slice());
  return a;
}

exports.print2dArray = print2dArray;
exports.callocArray  = callocArray;
