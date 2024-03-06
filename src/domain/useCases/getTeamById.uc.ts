import { Team } from "../models/team.model.js"
import TeamService from "../services/team.service.js"

export const GetTeamByIdUseCase =
	(teamService: TeamService) =>
	async (id: Team["id"]): Promise<Team> => {
		return await teamService.getById(id)
	}
