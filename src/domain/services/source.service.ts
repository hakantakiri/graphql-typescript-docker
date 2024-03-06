import { Coach } from "../models/coach.model.js"
import { Competition } from "../models/competition.model.js"
import { Team } from "../models/team.model.js"
import { Player } from "../models/player.model.js"
import { BASE_FOOTBALL_API_URL, FD_COMPETITIONS_URL_SUFIX } from "../../shared/config.js"
import { isInApiRate } from "../utils/apiRateValidator.js"
import { CacheServiceInterface } from "./interfaces/cacheService.interface.js"
import { HttpServiceInterface } from "./interfaces/httpService.interface.js"
import {
	ERR_MSG_INVALID_LEAGUE_CODE,
	ERR_MSG_RATE_LIMIT_EXCEEDED,
} from "../../shared/errorMessage.js"

export interface getTeamsByLeagueByCodeResp {
	teams: Team[]
	coaches: Coach[]
	players: Player[]
}

class SourceService {
	private cacheService: CacheServiceInterface
	private callsHistoryKey: string
	private httpService: HttpServiceInterface

	constructor(httpService: HttpServiceInterface, cacheService: CacheServiceInterface) {
		this.cacheService = cacheService
		this.callsHistoryKey = "pastApiCalls"
		this.httpService = httpService
	}

	private async validateApiRateLimit(): Promise<boolean> {
		const pastCalls: number[] =
			JSON.parse(await this.cacheService.getFromCache(this.callsHistoryKey)) || []

		const validation = isInApiRate(Date.now(), pastCalls)
		this.cacheService.saveInCache(
			this.callsHistoryKey,
			JSON.stringify(validation.updatedApiCalls)
		)
		return validation.valid
	}

	public async getCompetitionByCode(code: Competition["code"]): Promise<Competition> {
		if (!(await this.validateApiRateLimit())) {
			throw new Error(ERR_MSG_RATE_LIMIT_EXCEEDED)
		}
		let resp = await this.httpService.call(
			"GET",
			BASE_FOOTBALL_API_URL + FD_COMPETITIONS_URL_SUFIX + code
		)
		if (resp.error || resp.errorCode) {
			throw new Error(ERR_MSG_INVALID_LEAGUE_CODE(code))
		}
		let comp: Competition = {
			id: resp.id,
			code: resp.code,
			name: resp.name,
			type: resp.type,
			emblem: resp.emblem,
		}
		return comp
	}

	public async getTeamsByLeagueByCode(
		code: Competition["code"]
	): Promise<getTeamsByLeagueByCodeResp> {
		if (!(await this.validateApiRateLimit())) {
			throw new Error(ERR_MSG_RATE_LIMIT_EXCEEDED)
		}
		let resp = await this.httpService.call(
			"GET",
			BASE_FOOTBALL_API_URL + FD_COMPETITIONS_URL_SUFIX + code + "/teams"
		)

		if (resp.error || resp.errorCode) {
			throw new Error("No teams in given league")
		}

		let teams: Team[] = []
		let coaches: Coach[] = []
		let players: Player[] = []

		resp.teams.forEach((team) => {
			teams?.push({
				id: team.id,
				name: team.name,
				shortName: team.shortName,
				tla: team.tla,
				crest: team.crest,
				address: team.address,
				website: team.website,
				founded: team.founded,
				clubColors: team.clubColors,
				venue: team.venue,
			})

			let coach: Coach = team.coach
			coaches.push({
				id: coach.id,
				name: coach.name,
				dateOfBirth: coach.dateOfBirth,
				nationality: coach.nationality,
				teamId: team.id,
			})

			let squad: Player[] = team.squad
			squad?.forEach((player) => {
				players.push({
					id: player.id,
					name: player.name,
					position: player.position,
					dateOfBirth: player.dateOfBirth,
					nationality: player.nationality,
					teamId: team.id,
				})
			})
		})

		return { teams, coaches, players }
	}
}

export default SourceService
