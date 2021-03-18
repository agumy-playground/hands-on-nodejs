const events = require("events");

function createFizzBuzzEventEmitter() {
  const eventEmitter = new events.EventEmitter();
  return eventEmitter;
}

async function emitFizzBuzz(eventEmitter, until) {
  eventEmitter.emit("start");
  let count = 1;
  while (count <= until) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (count % 15 === 0) {
      eventEmitter.emit("FizzBuzz", count);
    } else if (count % 3 === 0) {
      eventEmitter.emit("Fizz", count);
    } else if (count % 5 === 0) {
      eventEmitter.emit("Buzz", count);
    }
    count += 1;
  }
  eventEmitter.emit("end");
}

function startListener() {
  console.log("start");
}

function fizzListener(count) {
  console.log("Fizz", count);
}

function buzzListener(count) {
  console.log("Buzz", count);
}

function fizzBuzzListener(count) {
  console.log("FizzBuzz", count);
}

function endListener() {
  console.log("end");

  this.off("start", startListener);
  this.off("Fizz", fizzListener);
  this.off("Buzz", buzzListener);
  this.off("FizzBuzz", fizzBuzzListener);
  this.off("end", endListener);
}

const eventEmitter = createFizzBuzzEventEmitter()
  .on("start", startListener)
  .on("Fizz", fizzListener)
  .once("Buzz", buzzListener)
  .on("FizzBuzz", fizzBuzzListener)
  .on("end", endListener);

emitFizzBuzz(eventEmitter, 40);
