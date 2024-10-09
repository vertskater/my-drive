const dbFolder = require("../db/folder");
const dbFiles = require("../db/files");

const addFolderGet = async (req, res) => {
  const folderId = req.params.folderId || null;
  res.render("add-folder", { title: "New Folder", folderId: folderId });
};
const addFolderPost = async (req, res, next) => {
  const userId = req.user.id;
  //TODO: validate folder name;
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
    const path = await dbFolder.getFolderHierarchy(parentFolder.id);
    const files = await dbFiles.getFilesSubDir(parentFolder.id, req.user.id);
    res.render("drive-home", {
      title: parentFolder?.name || "Folders",
      folders: children,
      parentId: folderUuid,
      path: path,
      files: files,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFolder = async (req, res, next) => {
  const folderUuid = req.params.folderId;
  try {
    const parentUuid = await dbFolder.getParentFolder(folderUuid);
    await dbFolder.deleteDir(folderUuid);
    parentUuid.parent
      ? res.redirect(`/drive/${parentUuid.parent.uuid}`)
      : res.redirect("/drive");
  } catch (err) {
    next(err);
  }
};

const editFolderGet = async (req, res, next) => {
  const folderUuid = req.params.folderId;
  if (!folderUuid) return next();
  try {
    const folder = await dbFolder.getFolderByUuid(folderUuid);
    res.render("edit-folder", {
      title: "edit folder",
      name: folder.name,
      folderId: folderUuid,
    });
  } catch (err) {
    next(err);
  }
};
const editFolderPost = async (req, res, next) => {
  //TODO: validate folder name
  const { folderName } = req.body;
  const folderUuid = req.params.folderId;
  try {
    const parentFolder = await dbFolder.getParentFolder(folderUuid);
    await dbFolder.updateFolderName(folderUuid, folderName);
    if (parentFolder.parent) {
      return res.redirect(`/drive/${parentFolder.parent?.uuid}`);
    }
    res.redirect("/drive");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addFolderGet,
  addFolderPost,
  showSubFolders,
  deleteFolder,
  editFolderGet,
  editFolderPost,
};
