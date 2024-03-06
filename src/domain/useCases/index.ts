import fdApiAdapter from "../../adapters/fdApi.adapter.js"
import { prismaAdapter } from "../../adapters/prisma.adapter.js"
import redisAdapter from "../../adapters/redis.adapter.js"
import CoachService from "../services/coach.service.js"
import CompetitionService from "../services/competition.service.js"
import PlayerService from "../services/player.service.js"
import SourceService from "../services/source.service.js"
import TeamService from "../services/team.service.js"
import { GetCoachByTeamUseCase } from "./getCoachByTeam.uc.js"
import { GetTeamByIdUseCase } from "./getTeamById.uc.js"
import { GetTeamByNameUseCase } from "./getTeamByName.uc.js"
import { ImportLeagueUseCase } from "./importLeague.uc.js"
import { ListCoachesByCompetitionUseCase } from "./listCoachesByCompetition.uc.js"
import { ListCompetitionsByTeamUseCase } from "./listCompetitionsByTeam.uc.js"
import { ListPlayersByCompetitionUseCase } from "./listPlayersByCompetition.uc.js"
import { ListPlayersByTeam } from "./listPlayersByTeam.uc.js"

let coachService = new CoachService(prismaAdapter)
let playerService = new PlayerService(prismaAdapter)
let teamService = new TeamService(prismaAdapter)
let competitionService = new CompetitionService(prismaAdapter)
let sourceService = new SourceService(fdApiAdapter, redisAdapter)

export const getCoachByTeamUseCase = GetCoachByTeamUseCase(coachService)
export const getTeamByIdUseCase = GetTeamByIdUseCase(teamService)
export const getTeamByNameUseCase = GetTeamByNameUseCase(teamService)
export const importLeagueUseCase = ImportLeagueUseCase(
	sourceService,
	competitionService,
	teamService,
	playerService,
	coachService
)
export const listCoachesByCompetitionUseCase = ListCoachesByCompetitionUseCase(
	coachService,
	competitionService,
	teamService
)
export const listCompetitionsByTeamUseCase = ListCompetitionsByTeamUseCase(competitionService)
export const listPlayersByCompetitionUseCase = ListPlayersByCompetitionUseCase(
	competitionService,
	teamService,
	playerService
)
export const listPlayersByTeam = ListPlayersByTeam(playerService)
