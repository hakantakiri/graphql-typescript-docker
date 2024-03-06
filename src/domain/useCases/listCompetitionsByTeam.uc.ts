import { Team } from "../models/team.model.js"
import { Competition } from "../models/competition.model.js"
import CompetitionService from "../services/competition.service.js"

export const ListCompetitionsByTeamUseCase =
	(competitionService: CompetitionService) =>
	async (teamId: Team["id"]): Promise<Competition[]> => {
		return await competitionService.listByTeam(teamId)
	}
