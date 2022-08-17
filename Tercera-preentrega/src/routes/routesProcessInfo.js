import { processInfo } from "../utils/processInfo.js";

export default (router) => {
  router.get("/info", (req, res, next) => {
    // console.log(processInfo);
    res.send(processInfo);
  });

  return router;
};