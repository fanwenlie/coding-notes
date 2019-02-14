export default function printMe() {
  console.log('app2 import1');
}

const a = function() {
  console.log('app2_import_export1');
}

const b = function() {
  console.log('app2_import_exportb');
}

export {
  a,
  b,
}