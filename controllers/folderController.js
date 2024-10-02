const dbFolder = require("../db/folder");

const addFolderGet = async (req, res) => {
  const folderId = req.params.folderId || null;
  res.render("add-folder", { title: "New Folder", folderId: folderId });
};
const addFolderPost = async (req, res, next) => {
  const userId = req.user.id;
  //const parentFolderUuid = req.body.folderId;
  const folderName = req.body.folderName || "New Folder";
  const folderUuid = req.params.folderId;
  try {
    if (!folderUuid) {
      await dbFolder.addFolder(folderName, userId);
      res.redirect("/drive");
    } else {
      const parentFolder = await dbFolder.getFolderByUuid(folderUuid);
      await dbFolder.addFolder(folderName, userId, parentFolder.id);
      res.redirect(`/drive/${folderUuid}`);
    }
  } catch (err) {
    next(err);
  }
};

const showSubFolders = async (req, res, next) => {
  try {
    const folderUuid = req.params.folderId;
    const parentFolder = await dbFolder.getSubFolders(folderUuid);
    const children = parentFolder?.children || [];
    res.render("drive-home", {
      title: parentFolder?.name || "Folders",
      folders: children,
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
