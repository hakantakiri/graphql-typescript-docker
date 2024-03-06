import { Competition } from "../models/competition.model.js"
import { Player } from "../models/player.model.js"
import { Team } from "../models/team.model.js"
import CompetitionService from "../services/competition.service.js"
import PlayerService from "../services/player.service.js"
import TeamService from "../services/team.service.js"

export const ListPlayersByCompetitionUseCase =
	(
		competitionService: CompetitionService,
		teamService: TeamService,
		playerService: PlayerService
	) =>
	async (code: Competition["code"], teamName?: Team["name"]): Promise<Player[]> => {
		const competition: Competition = await competitionService.getByCode(code)
		if (!competition) {
			return null
		}
		let teams: Team[] = await teamService.listByCompetition(competition.id)
		if (teamName) {
			teams = teams.filter((team) => team.name === teamName)
		}
		return await playerService.listByTeams(teams.map((t) => t.id))
	}
