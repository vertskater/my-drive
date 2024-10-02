const dbFolder = require("../db/folder");

const addFolderGet = async (req, res) => {
  res.render("add-folder", { title: "New Folder" });
};
const addFolderPost = async (req, res, next) => {
  const userId = req.user.id;
  const parentFolderUuid = req.body.folderId;
  const folderName = req.body.folderName || "New Folder";
  try {
    if (!parentFolderUuid) {
      await dbFolder.addFolder(folderName, userId);
      res.redirect("/drive");
    }
  } catch (err) {
    next(err);
  }
};

const showSubFolders = async (req, res, next) => {
  try {
    const folderUuid = req.params.folderId;
    const parentFolder = await dbFolder.getSubFolders(folderUuid);
    res.render("drive-home", {
      title: parentFolder?.name || "Folders",
      folders: parentFolder.children,
      parentId: folderUuid,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addFolderGet,
  addFolderPost,
  showSubFolders,
};
