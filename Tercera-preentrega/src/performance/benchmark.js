import autocannon, { track } from "autocannon";
import { PassThrough } from "stream";

const run = (url) => {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  track(inst, { outputStream });

  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf));
  });

  console.log("Running all benchmarks in");
};

run("http://localhost:8080/info");
