"use strict";

const sharedArrayBuffer = new SharedArrayBuffer(1024);
console.log(sharedArrayBuffer);

const uint8Array = new Uint8Array(sharedArrayBuffer);
console.log(uint8Array);

const int32Array = new Int32Array(sharedArrayBuffer);
console.log(int32Array);

console.log("uint8", uint8Array.length);
console.log("int32", int32Array.length);
int32Array[0] = 1000;
console.log(uint8Array.slice(0, 4));
