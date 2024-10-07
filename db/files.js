const prisma = require("./prismaClient");

const saveSingleFile = async (file, userId, folderId = null) => {
  await prisma.file.create({
    data: {
      name: file.originalname,
      cloudlink: file.path,
      folderId: folderId,
      ownerId: userId,
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

module.exports = {
  saveSingleFile,
  getRootFiles,
  getFilesSubDir,
};
