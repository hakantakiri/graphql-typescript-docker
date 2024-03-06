//@ts-nocheck
import { PrismaClient } from "@prisma/client"
import { beforeEach, describe, vi, it, expect } from "vitest"
import { mockReset, mockDeep, DeepMockProxy } from "vitest-mock-extended"
import PlayerService from "../src/domain/services/player.service.js"
import prisma from "./libs/client.js"
import { ImportLeagueUseCase } from "../src/domain/useCases/importLeague.uc.js"
import SourceService from "../src/domain/services/source.service.js"
import { HttpServiceInterface } from "../src/domain/services/interfaces/httpService.interface.js"
import { CacheServiceInterface } from "../src/domain/services/interfaces/cacheService.interface.js"
import CompetitionService from "../src/domain/services/competition.service.js"
import TeamService from "../src/domain/services/team.service.js"
import CoachService from "../src/domain/services/coach.service.js"
import {
	fullLeagueCodeTeamsResp,
	invalidLeagueCode,
	validCompetition,
	validLeagueCode,
	validLeagueCodes,
} from "./mocks/data.js"

vi.mock("./libs/client", () => ({
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

prismaMock.competition.findFirst = async () => null

const mockHttpServer: HttpServiceInterface = {
	call(method, URL, data) {
		let sp = URL.split("/")
		if (sp.length === 3) {
			return fullLeagueCodeTeamsResp
		} else {
			let code = URL.split("/")[1]
			if (validLeagueCodes.includes(code)) {
				return validCompetition
			} else {
				return { error: "Not valid code" }
			}
		}
	},
}

const cacheService: CacheServiceInterface = {
	getFromCache() {
		return null
	},
	saveInCache() {
		return
	},
}

let sourceService = new SourceService(mockHttpServer, cacheService)
let competitionService = new CompetitionService(prismaMock)
let teamService = new TeamService(prismaMock)
let playerService = new PlayerService(prismaMock)
let coachService = new CoachService(prismaMock)
let importLeagueUseCase = ImportLeagueUseCase(
	sourceService,
	competitionService,
	teamService,
	playerService,
	coachService
)

describe("Import League use case", () => {
	it("Invalid code, should throw error", async (): Promise<void> => {
		expect(async () => await importLeagueUseCase(invalidLeagueCode)).rejects.toThrow()
	})

	it("Valid code, should not be error", async (): Promise<void> => {
		let importedLeague = await importLeagueUseCase(validLeagueCode)
		expect(importedLeague.code).toBe(validLeagueCode)
	})
})
