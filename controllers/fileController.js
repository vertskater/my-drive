const dbFiles = require("../db/files");
const dbFolder = require("../db/folder");
const dbUser = require("../db/users");
const { uploadFileToSupaBase, downloadFile } = require("../db/supaBaseStorage");
const { supaBaseAuthWithPassword } = require("../config/supabase");

const uploadFileGet = (req, res, next) => {
  const folderId = req.params.folderId || null;
  res.render("upload-file", { title: "Upload file", folderId: folderId });
};

const uploadFilePost = async (req, res, next) => {
  const file = req.file;
  if (!file) return next();
  const userId = req.user.id;
  try {
    //Supabase file storage - upload
    const token = await supaBaseAuthWithPassword();
    const filePath = `${req.user.uuid}/${file.originalname}`;
    const fileUpload = await uploadFileToSupaBase(
      process.env.BUCKET_NAME,
      filePath,
      file,
      token
    );
    //Postgres DB save with sub/root folder
    const folderUuid = req.params.folderId || null;
    if (folderUuid) {
      const folder = await dbFolder.getFolderByUuid(folderUuid);
      await dbFiles.saveSingleFile(file, userId, fileUpload, folder.id);
      res.redirect(`/drive/${folderUuid}`);
    } else {
      await dbFiles.saveSingleFile(file, userId, fileUpload);
      res.redirect("/drive");
    }
  } catch (err) {
    next(err);
  }
};

const fileDetailsGet = async (req, res, next) => {
  //TODO: link to get back to current folder (folder uuid)
  const fileUuid = req.params.fileId;
  if (!fileUuid) return next();
  const file = await dbFiles.getFileByUuid(fileUuid);
  res.render("file-details", {
    title: `${file.name}`,
    file: file,
  });
};

const fileDownload = async (req, res, next) => {
  const fileUuid = req.params.fileId;
  try {
    const file = await dbFiles.getFileByUuid(fileUuid);
    const { data, error } = await downloadFile(
      process.env.BUCKET_NAME,
      file.cloudPath
    );
    if (error) return next(error);
    const buffer = await data.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    res.set({
      "Content-Type": data.type,
      "Content-Disposition": `attachment; filename="${file.name}"`,
    });
    res.send(fileBuffer);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFileGet,
  uploadFilePost,
  fileDetailsGet,
  fileDownload,
};
