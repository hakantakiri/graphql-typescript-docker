import { importLeagueUseCase } from "../../domain/useCases/index.js"
import { listPlayersByCompetitionUseCase } from "../../domain/useCases/index.js"
import { getTeamByNameUseCase } from "../../domain/useCases/index.js"
import { listPlayersByTeam } from "../../domain/useCases/index.js"
import { getCoachByTeamUseCase } from "../../domain/useCases/index.js"
import { listCompetitionsByTeamUseCase } from "../../domain/useCases/index.js"
import { listCoachesByCompetitionUseCase } from "../../domain/useCases/index.js"
import { getTeamByIdUseCase } from "../../domain/useCases/index.js"
import { Coach } from "../../domain/models/coach.model.js"
import { Player } from "../../domain/models/player.model.js"
import { Competition } from "../../domain/models/competition.model.js"
import { Team } from "../../domain/models/team.model.js"

export const resolvers = {
	Query: {
		players: async (_, args) => {
			return listPlayersByCompetitionUseCase(args.leagueCode, args.filters?.teamName)
		},
		coaches: async (_, args) => {
			return listCoachesByCompetitionUseCase(args.leagueCode)
		},
		team: async (_, args) => {
			return getTeamByNameUseCase(args.teamName)
		},
	},
	Team: {
		players: async (parent: Team) => {
			return listPlayersByTeam(parent.id)
		},
		coach: async (parent: Team) => {
			return getCoachByTeamUseCase(parent.id)
		},
		competitions: async (parent: Team) => {
			return listCompetitionsByTeamUseCase(parent.id)
		},
	},
	Coach: {
		team: async (parent: Coach) => {
			return getTeamByIdUseCase(parent.teamId)
		},
	},
	Player: {
		team: async (parent: Player) => {
			return getTeamByIdUseCase(parent.teamId)
		},
	},
	Mutation: {
		importLeague: async (_, args) => {
			let competition: Competition = await importLeagueUseCase(args.leagueCode)
			return competition
		},
	},
}
