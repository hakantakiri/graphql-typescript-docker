import { Coach } from "../models/coach.model.js"
import { Competition } from "../models/competition.model.js"
import { Team } from "../models/team.model.js"
import CoachService from "../services/coach.service.js"
import CompetitionService from "../services/competition.service.js"
import TeamService from "../services/team.service.js"

export const ListCoachesByCompetitionUseCase =
	(
		coachService: CoachService,
		competitionService: CompetitionService,
		teamService: TeamService
	) =>
	async (code: Competition["code"]): Promise<Coach[]> => {
		const competition: Competition = await competitionService.getByCode(code)
		if (!competition) {
			return null
		}
		let teams: Team[] = await teamService.listByCompetition(competition.id)
		return await coachService.listByTeams(teams.map((t) => t.id))
	}
