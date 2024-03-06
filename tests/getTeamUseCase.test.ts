//@ts-nocheck
import { PrismaClient } from "@prisma/client"
import { beforeEach, describe, vi, it, expect } from "vitest"
import { mockReset, mockDeep, DeepMockProxy } from "vitest-mock-extended"
import prisma from "./libs/client.js"
import TeamService from "../src/domain/services/team.service.js"
import { fullTeamResp, inValidTeamName, validTeamName } from "./mocks/data.js"
import { GetTeamByNameUseCase } from "../src/domain/useCases/getTeamByName.uc.js"

vi.mock("./libs/client", () => ({
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

prismaMock.team.findFirst = async (data) => {
	return data.where.name === validTeamName ? fullTeamResp : null
}

let teamService = new TeamService(prismaMock)

let getTeamByNameUseCase = GetTeamByNameUseCase(teamService)

describe("Query team by team name", () => {
	it("Invalid name, should return null", async (): Promise<void> => {
		let team = await getTeamByNameUseCase(inValidTeamName)
		expect(team).toBeNull()
	})

	it("Valid name, should return players list", async (): Promise<void> => {
		let team = await getTeamByNameUseCase(validTeamName)
		expect(team.name).toBe(validTeamName)
	})
})
