import { Coach } from "../models/coach.model.js"
import { Team } from "../models/team.model.js"
import CoachService from "../services/coach.service.js"
// import coachService from "../services/coach.service.js"

export const GetCoachByTeamUseCase =
	(coachService: CoachService) =>
	async (teamId: Team["id"]): Promise<Coach> => {
		return await coachService.getByTeam(teamId)
	}
