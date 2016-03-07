// Simple code for simple Mocha tests
var x = 5;
var a = [1, 2, 3];
function foo() { return x; }

exports.x = x;
exports.a = a;
exports.foo = foo;

//===========================
// Greet method
var message = '';

function greet(name) {
  message = 'Hi, ' + name + '!';
  console.log('message = ' + message);
  return message;
}

exports.greet = greet;

// Command line arg arg for greet()
if (typeof process.argv[2] == 'undefined') {
  console.log('  Usage:\n   node '+process.argv[1].split('/').pop()+' [name]');
  name = 'Jo';
  console.log('  NOTE: No name specified. Using default name "'+name+'"\n');
} else {
  name = process.argv[2];
  console.log('  You entered the name "'+name+'"\n');
}

greet(name);
