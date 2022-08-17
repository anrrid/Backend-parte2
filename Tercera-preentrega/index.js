// const { PORT } = require('./src/config/globals');
import  initMongoDB  from "./src/daos/db/mongoConnection.js";
import { listen } from "./server.es6.js";
import { isMaster, fork, on } from "cluster";
const numCPUs = require("os").cpus().length;
import { PORT } from "./src/config/globals.js";

/*En nuestra linea de comandamos tenemos
primer argumento: FORK o CLUSTER
segundo argument: port
tercer argumento: facebook client
cuarto argumento: facebook secret
*/

// initMongoDB()
//   .then((msg) => {
//     console.log(msg);
//     http.listen(PORT, () =>
//       console.log(`Working on ${PORT} and procces id ${process.pid}!`)
//     );
//   })
//   .catch((err) => console.log(err));



if (process.argv[2] === "cluster") {
  console.log("Servidor iniciado en modo CLUSTER");

  if (isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      fork();
    }

    on("exit", (worker) => {
      console.log(
        `Worker ${
          worker.process.pid
        } DIED at ${new Date().toLocaleDateString()}!`
      );
    });
  } else {
    initMongoDB()
      .then((msg) => {
        console.log(msg);
        listen(PORT, () =>
          console.log(`Working on ${PORT}! and procces id ${process.pid}`)
        );
      })
      .catch((err) => console.log(err));
  }
} else {
  console.log("Servidor iniciado en modo FORK");
  initMongoDB()
    .then((msg) => {
      console.log(msg);
      listen(PORT, () =>
        console.log(`Working on ${PORT} and procces id ${process.pid}!`)
      );
    })
    .catch((err) => console.log(err));
}
