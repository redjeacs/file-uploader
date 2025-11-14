const { PrismaClient } = require("@prisma/client");
const { fileLoader } = require("ejs");
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

exports.getFolder = async (colName, query) => {
  const where = { [colName]: query };
  const folder = await prisma.folder.findUnique({
    where: where,
    include: { files: true },
  });
  return folder;
};

exports.getFile = async (colName, query) => {
  const where = { [colName]: query };
  const file = await prisma.file.findUnique({
    where: where,
  });
  return file;
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

exports.createFile = async (file, fileUrl, userId, folderId = null) => {
  if (folderId) {
    await prisma.file.create({
      data: {
        name: file.originalname,
        size: file.size,
        path: fileUrl,
        folder: {
          connect: { id: folderId },
        },
      },
    });
  } else {
    await prisma.file.create({
      data: {
        name: file.originalname,
        size: file.size,
        path: fileUrl,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
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

exports.editFile = async (fileId, newName) => {
  await prisma.file.update({
    data: {
      name: newName,
    },
    where: {
      id: fileId,
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

exports.deleteFile = async (fileId) => {
  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
};
