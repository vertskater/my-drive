const prisma = require("./prismaClient");

const saveSingleFile = async (file, userId, supaBase, folderId = null) => {
  console.log(supaBase);
  await prisma.file.create({
    data: {
      name: file.originalname,
      cloudPath: supaBase.path,
      cloudId: supaBase.id,
      folderId: folderId,
      ownerId: userId,
      size: file.size,
    },
  });
};

const getRootFiles = async (userId) => {
  return prisma.file.findMany({
    where: {
      ownerId: userId,
      folderId: null,
    },
  });
};
const getFilesSubDir = async (folderId, ownerId) => {
  return prisma.file.findMany({
    where: {
      ownerId: ownerId,
      folderId: folderId,
    },
  });
};

const getFileByUuid = async (uuid) => {
  return prisma.file.findUnique({
    where: {
      uuid: uuid,
    },
  });
};

const deleteFileByUuid = async (uuid) => {
  await prisma.file.delete({
    where: {
      uuid: uuid,
    },
  });
};

module.exports = {
  saveSingleFile,
  getRootFiles,
  getFilesSubDir,
  getFileByUuid,
  deleteFileByUuid,
};
