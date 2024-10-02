const prisma = require("./prismaClient");

/**
 * Gets new folder name, user uuid and
 *
 * @param name
 * @param userUuid
 * @param parentId
 * @returns {Promise<void>}
 */
const addFolder = async (name, userUuid, parentId = null) => {
  await prisma.folder.create({
    data: {
      name: name,
      parentId: parentId,
      ownerId: userUuid,
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

module.exports = {
  addFolder,
  getRootFolders,
  getSubFolders,
};
