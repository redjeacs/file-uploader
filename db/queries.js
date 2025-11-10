const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (colName, query) => {
  const key = { [colName]: query };
  const user = await prisma.user.findUnique({
    where: key,
    include: {
      folders: true,
      files: true,
    },
  });
  return user;
};

exports.createUser = async (username, password) => {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
};

exports.createFolder = async (userId) => {
  await prisma.folder.create({
    data: {
      name: "New Folder",
      user: {
        connect: { id: userId },
      },
    },
  });
};
