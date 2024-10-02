const driveRouter = require("express").Router();
const { isAuth } = require("./authMiddleware");

const folderController = require("../controllers/folderController");
driveRouter.get("/add-folder", isAuth, folderController.addFolderGet);
driveRouter.post("/add-folder", isAuth, folderController.addFolderPost);
driveRouter.get("/:folderId/add-folder", isAuth, folderController.addFolderGet);
driveRouter.post(
  "/:folderId/add-folder",
  isAuth,
  folderController.addFolderPost
);

driveRouter.get("/:folderId", isAuth, folderController.showSubFolders);

module.exports = driveRouter;
