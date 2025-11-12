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

exports.getFolder = async (colName, query) => {
  const key = { [colName]: query };
  const folder = await prisma.folder.findUnique({
    where: key,
    include: { files: true },
  });
  return folder;
};

exports.editFolder = async (folderId, newName) => {
  await prisma.folder.update({
    data: {
      name: newName,
    },
    where: {
      id: folderId,
    },
  });
};

exports.deleteFolder = async (folderId) => {
  await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
};
