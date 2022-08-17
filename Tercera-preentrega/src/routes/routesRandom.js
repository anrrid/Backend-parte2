import randomNumberController from "../controller/randomNumberController.js";

export default (router) => {
  router.get("/randoms", randomNumberController);
  return router;
};
