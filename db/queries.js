const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (colName, query) => {
  const key = { colName: query };
  const user = await prisma.findUnique({
    where: key,
  });
  return user;
};
