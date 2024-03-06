import { Player } from "../models/player.model.js"
import { Team } from "../models/team.model.js"
import PlayerService from "../services/player.service.js"

export const ListPlayersByTeam =
	(playerService: PlayerService) =>
	async (teamId: Team["id"]): Promise<Player[]> => {
		return await playerService.listByTeam(teamId)
	}
