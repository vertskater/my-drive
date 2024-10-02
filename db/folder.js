const prisma = require("./prismaClient");

/**
 * Gets new folder name, user uuid and
 *
 * @param name
 * @param userId @Int
 * @param parentId
 * @returns {Promise<void>}
 */
const addFolder = async (name, userId, parentId = null) => {
  await prisma.folder.create({
    data: {
      name: name,
      parentId: parentId,
      ownerId: userId,
    },
  });
};

const getRootFolders = async (id) => {
  return prisma.folder.findMany({
    where: {
      ownerId: id,
      parentId: null,
    },
    include: {
      children: true,
    },
  });
};
const getSubFolders = async (uuid) => {
  return prisma.folder.findUnique({
    where: {
      uuid: uuid,
    },
    include: {
      children: true,
    },
  });
};

const getFolderByUuid = async (uuid) => {
  return prisma.folder.findUnique({
    where: {
      uuid: uuid,
    },
  });
};

const getFolderHierarchy = async (id) => {};

module.exports = {
  addFolder,
  getRootFolders,
  getSubFolders,
  getFolderByUuid,
};
