export default function printMe() {
  console.log('app1 import1');
}

const a = function() {
  console.log('app1_import_export1');
}

const b = function() {
  console.log('app1_import_exportb');
}

export {
  a,
  b,
}