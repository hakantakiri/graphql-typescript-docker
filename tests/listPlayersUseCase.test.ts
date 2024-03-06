//@ts-nocheck
import { PrismaClient } from "@prisma/client"
import { beforeEach, describe, vi, it, expect } from "vitest"
import { mockReset, mockDeep, DeepMockProxy } from "vitest-mock-extended"
import PlayerService from "../src/domain/services/player.service.js"
import prisma from "./libs/client.js"
import CompetitionService from "../src/domain/services/competition.service.js"
import TeamService from "../src/domain/services/team.service.js"
import {
	fullPlayersResp,
	invalidLeagueCode,
	validCompetition,
	validLeagueCode,
	validLeagueCodes,
} from "./mocks/data.js"
import { ListPlayersByCompetitionUseCase } from "../src/domain/useCases/listPlayersByCompetition.uc.js"

vi.mock("./libs/client", () => ({
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

prismaMock.competition.findFirst = async (data) => {
	const code = data.where.code
	if (validLeagueCodes.includes(code)) {
		return validCompetition
	} else {
		return null
	}
}

prismaMock.competition_team.findMany = async () => []

prismaMock.team.findMany = async () => []

prismaMock.player.findMany = async () => fullPlayersResp

let competitionService = new CompetitionService(prismaMock)
let teamService = new TeamService(prismaMock)
let playerService = new PlayerService(prismaMock)

let listPlayersByCompetitionUseCase = ListPlayersByCompetitionUseCase(
	competitionService,
	teamService,
	playerService
)

describe("Query players by league code", () => {
	it("Invalid code, should return null", async (): Promise<void> => {
		let players = await listPlayersByCompetitionUseCase(invalidLeagueCode)
		expect(players).toBeNull()
	})

	it("Valid code, should return players list", async (): Promise<void> => {
		let players = await listPlayersByCompetitionUseCase(validLeagueCode)
		expect(players.length).toBeGreaterThan(0)
	})
})
