const driveRouter = require("express").Router();
const { isAuth } = require("./authMiddleware");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: multer.memoryStorage() });

const folderController = require("../controllers/folderController");
driveRouter.get("/add-folder", isAuth, folderController.addFolderGet);
driveRouter.post("/add-folder", isAuth, folderController.addFolderPost);
driveRouter.get("/:folderId/add-folder", isAuth, folderController.addFolderGet);
driveRouter.post(
  "/:folderId/add-folder",
  isAuth,
  folderController.addFolderPost
);
//file upload
const fileController = require("../controllers/fileController");

driveRouter.get("/upload-file", isAuth, fileController.uploadFileGet);
driveRouter.post(
  "/upload-file",
  isAuth,
  upload.single("fileUpload"),
  fileController.uploadFilePost
);
driveRouter.post(
  "/:folderId/upload-file",
  isAuth,
  upload.single("fileUpload"),
  fileController.uploadFilePost
);

driveRouter.get("/:folderId/upload-file", isAuth, fileController.uploadFileGet);
//folder CRUD operations
//TODO: implement delete warning
driveRouter.get("/:folderId/delete", isAuth, folderController.deleteFolder);
driveRouter.get("/:folderId/edit", isAuth, folderController.editFolderGet);
driveRouter.post("/:folderId/edit", isAuth, folderController.editFolderPost);

//file upload
driveRouter.get("/:folderId", isAuth, folderController.showSubFolders);
driveRouter.get("/single-file/:fileId", isAuth, fileController.fileDetailsGet);
driveRouter.get(
  "/single-file/:fileId/download",
  isAuth,
  fileController.fileDownload
);
driveRouter.get(
  "/single-file/:fileId/delete",
  isAuth,
  fileController.deleteFile
);
module.exports = driveRouter;
