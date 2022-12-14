import type { Player, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { SeedPlayer } from "./players";
import { players } from "./players";

const prisma = new PrismaClient();

async function seed() {
  await Promise.all(
    players.map((player) => {
      const data = {
        name: player.name || "",
        rank: player.rank || 1,
        team: player.team || "",
        position: player.position || "",
      };
      return prisma.player.create({ data });
    })
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
