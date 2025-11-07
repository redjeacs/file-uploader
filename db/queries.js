const { PrismaClient } = require("@prisma/client");
const {
  UNABLE_TO_FIND_POSTINSTALL_TRIGGER_JSON_SCHEMA_ERROR,
} = require("@prisma/client/scripts/postinstall.js");
const prisma = new PrismaClient();

exports.getUser = async (colName, query) => {
  const key = { colName: query };
  const user = await prisma.findUnique({
    where: key,
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
