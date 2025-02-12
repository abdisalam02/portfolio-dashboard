const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      { name: "Portfolio Website", description: "My personal portfolio." },
      { name: "E-commerce Store", description: "A dynamic e-commerce store." },
      { name: "Task Manager App", description: "An efficient task manager." },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
