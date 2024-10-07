const dbFiles = require("../db/files");
const dbFolder = require("../db/folder");

const uploadFileGet = (req, res, next) => {
  const folderId = req.params.folderId || null;
  res.render("upload-file", { title: "Upload file", folderId: folderId });
};

const uploadFilePost = async (req, res, next) => {
  const file = req.file;
  if (!file) return next();
  const userId = req.user.id;
  try {
    const folderUuid = req.params.folderId || null;
    if (folderUuid) {
      const folder = await dbFolder.getFolderByUuid(folderUuid);
      await dbFiles.saveSingleFile(file, userId, folder.id);
      res.redirect(`/drive/${folderUuid}`);
    } else {
      await dbFiles.saveSingleFile(file, userId);
      res.redirect("/drive");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFileGet,
  uploadFilePost,
};
