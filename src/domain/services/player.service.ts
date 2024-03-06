import { Prisma, PrismaClient } from "@prisma/client"
import { Player } from "../models/player.model.js"
import { Team } from "../models/team.model.js"

class PlayerService {
	private prisma: PrismaClient
	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async addMany(playersToAdd: Player[]): Promise<Player[]> {
		const payload: Prisma.BatchPayload = await this.prisma.player.createMany({
			data: playersToAdd,
			skipDuplicates: true,
		})
		return playersToAdd
	}

	public async listByTeam(teamId: Team["id"]): Promise<Player[]> {
		const players: Player[] = await this.prisma.player.findMany({
			where: { teamId: teamId },
		})
		return players
	}

	public async listByTeams(teamIds: Team["id"][]): Promise<Player[]> {
		const players: Player[] = await this.prisma.player.findMany({
			where: { teamId: { in: teamIds } },
		})
		return players
	}
}

export default PlayerService
