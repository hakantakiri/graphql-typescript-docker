import { Prisma, PrismaClient } from "@prisma/client"
import { Coach } from "../models/coach.model.js"
import { Team } from "../models/team.model.js"

class CoachService {
	private prisma: PrismaClient
	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async addMany(coachesToAdd: Coach[]): Promise<Coach[]> {
		const payload: Prisma.BatchPayload = await this.prisma.coach.createMany({
			data: coachesToAdd,
			skipDuplicates: true,
		})
		return coachesToAdd
	}

	public async getByTeam(teamId: Team["id"]): Promise<Coach> {
		const coach: Coach = await this.prisma.coach.findFirst({
			where: { teamId: teamId },
		})
		return coach
	}

	public async listByTeams(teamIds: Team["id"][]): Promise<Coach[]> {
		const coaches: Coach[] = await this.prisma.coach.findMany({
			where: { teamId: { in: teamIds } },
		})
		return coaches
	}
}

export default CoachService
