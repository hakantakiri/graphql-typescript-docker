import { Team } from "../models/team.model.js"
import TeamService from "../services/team.service.js"

export const GetTeamByNameUseCase =
	(teamService: TeamService) =>
	async (name: Team["name"]): Promise<Team> => {
		return await teamService.getByName(name)
	}
