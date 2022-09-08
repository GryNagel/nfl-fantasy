import { e } from "vitest/dist/index-ea17aa0c";
import { prisma } from "~/db.server";

export type { Player } from "@prisma/client";

export function getPlayers(role?: string | null) {
  if (!role) {
    return prisma.player.findMany();
  } else {
    return prisma.player.findMany({
      where: {
        position: role.toUpperCase(),
      },
    });
  }
}

export async function updatePlayer(
  playerId: string,
  data: { tag: string | null; string: string | null; note: string | null }
) {
  const player = await prisma.player.findFirst({ where: { id: playerId } });

  return prisma.player.update({
    where: {
      id: playerId,
    },
    data: {
      tag: data.tag !== null ? data.tag : player?.tag,
      string: data.string !== null ? data.string : player?.string,
      note: data.note !== null ? data.note : player?.note,
    },
  });
}
