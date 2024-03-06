import { PrismaClient } from "@prisma/client"
import { Competition } from "../models/competition.model.js"
import { Team } from "../models/team.model.js"
import { CompetitionTeam } from "../models/competitionTeam.model.js"

class CompetitionService {
	private prisma: PrismaClient
	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async add(comp: Competition): Promise<Competition> {
		const competition: Competition = await this.prisma.competition.create({
			data: comp,
		})
		return competition
	}
	public async getByCode(code: Competition["code"]): Promise<Competition> {
		return await this.prisma.competition.findFirst({ where: { code: code } })
	}

	public async linkTeams(competitionId: Competition["id"], teamIds: Team["id"][]): Promise<void> {
		await this.prisma.competition_team.createMany({
			data: teamIds.map((teamId) => {
				return { teamId: teamId, competitionId: competitionId }
			}),
			skipDuplicates: true,
		})
	}

	public async listByTeam(teamId: Team["id"]): Promise<Competition[]> {
		const comp_teams: CompetitionTeam[] = await this.prisma.competition_team.findMany({
			where: { teamId: teamId },
		})
		return await this.prisma.competition.findMany({
			where: { id: { in: comp_teams.map((c) => c.competitionId) } },
		})
	}
}

export default CompetitionService
