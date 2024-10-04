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

const getFolderHierarchy = async (id) => {
  const folder = await prisma.folder.findUnique({
    where: { id: id },
    select: {
      name: true,
      uuid: true,
      id: true,
      parent: {
        select: {
          name: true,
          id: true,
          uuid: true,
        },
      },
    },
  });
  if (!folder) return [];
  const hierarchy = [];
  if (folder.parent) {
    const parentHierarchy = await getFolderHierarchy(folder.parent.id);
    hierarchy.push(...parentHierarchy);
  }
  hierarchy.push({ name: folder.name, id: folder.id, uuid: folder.uuid });
  return hierarchy;
};

const getParentFolder = async (uuid) => {
  return prisma.folder.findUnique({
    where: {
      uuid: uuid,
    },
    select: {
      parent: {
        select: {
          uuid: true,
        },
      },
    },
  });
};

const deleteDir = async (uuid) => {
  await prisma.folder.delete({
    where: {
      uuid: uuid,
    },
  });
};
const updateFolderName = async (uuid, name) => {
  await prisma.folder.update({
    where: {
      uuid: uuid,
    },
    data: {
      name: name,
    },
  });
};
module.exports = {
  addFolder,
  getRootFolders,
  getSubFolders,
  getFolderByUuid,
  getFolderHierarchy,
  getParentFolder,
  deleteDir,
  updateFolderName,
};
