import { Competition } from "../models/competition.model.js"
import { getTeamsByLeagueByCodeResp } from "../services/source.service.js"
import CompetitionService from "../services/competition.service.js"
import SourceService from "../services/source.service.js"
import TeamService from "../services/team.service.js"
import PlayerService from "../services/player.service.js"
import CoachService from "../services/coach.service.js"

export const ImportLeagueUseCase =
	(
		sourceService: SourceService,
		competitionService: CompetitionService,
		teamService: TeamService,
		playerService: PlayerService,
		coachService: CoachService
	) =>
	async (code: Competition["code"]): Promise<Competition> => {
		if (!code) return null
		let comp: Competition = await competitionService.getByCode(code)

		if (comp) return comp
		const newCompetition: Competition = await sourceService.getCompetitionByCode(code)

		if (!newCompetition) return null

		const { teams, coaches, players }: getTeamsByLeagueByCodeResp =
			await sourceService.getTeamsByLeagueByCode(code)

		await Promise.all([competitionService.add(newCompetition), teamService.addMany(teams)])
		await competitionService.linkTeams(
			newCompetition.id,
			teams.map((t) => t.id)
		)
		await Promise.all([coachService.addMany(coaches), playerService.addMany(players)])
		console.log(`Imported league ${code}`)

		return newCompetition
	}
