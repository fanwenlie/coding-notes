function binaryValue(val) {
  const fArr = new Float32Array(1);
  fArr[0] = val;
  const intBytes = new Int8Array(fArr.buffer);
  const view = new DataView(intBytes.buffer);
  return view.getUint32();
}

console.log( binaryValue(1.2) )
