import { Prisma, PrismaClient } from "@prisma/client"
import { Team } from "../models/team.model.js"
import { Competition } from "../models/competition.model.js"
import { CompetitionTeam } from "../models/competitionTeam.model.js"

class TeamService {
	private prisma: PrismaClient
	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}
	public async add(toInsertTeam: Team): Promise<Team> {
		const team: Team = await this.prisma.team.create({ data: toInsertTeam })
		return team
	}

	public async addMany(teamsToAdd: Team[]): Promise<Team[]> {
		const payload: Prisma.BatchPayload = await this.prisma.team.createMany({
			data: teamsToAdd,
			skipDuplicates: true,
		})
		return teamsToAdd
	}

	public async getById(id: Team["id"]): Promise<Team> {
		return await this.prisma.team.findFirst({ where: { id: id } })
	}

	public async getByName(name: Team["name"]): Promise<Team> {
		return await this.prisma.team.findFirst({ where: { name: name } })
	}

	public async listByCompetition(competitionId: Competition["id"]): Promise<Team[]> {
		const competition_teams: CompetitionTeam[] = await this.prisma.competition_team.findMany({
			where: { competitionId: competitionId },
		})
		const teams: Team[] = await this.prisma.team.findMany({
			where: { id: { in: competition_teams.map((ct) => ct.teamId) } },
		})
		return teams
	}
}

export default TeamService
