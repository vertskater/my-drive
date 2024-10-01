const prisma = require("./prismaClient");

const getUserByUsername = (username) => {
  return prisma.users.findFirst({
    where: {
      username: username,
    },
  });
};

const getUserByUuid = (uuid) => {
  return prisma.users.findFirst({
    where: {
      uuid: uuid,
    },
  });
};
const pushNewUser = async (user) => {
  await prisma.users.create({
    data: {
      forename: user.forename,
      surname: user.surname,
      username: user.username,
      password: user.password,
    },
  });
};

module.exports = {
  getUserByUsername,
  getUserByUuid,
  pushNewUser,
};
