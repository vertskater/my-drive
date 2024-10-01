const driveRouter = require("express").Router();
const { isAuth } = require("./authMiddleware");

driveRouter.get("/:folderId", isAuth, (req, res) => {
  res.send(`you are in the folder ${req.params.folderId}`);
});

module.exports = driveRouter;
