import { describe, expect, it } from "vitest"
import { isInApiRate } from "../src/domain/utils/apiRateValidator.js"
import { INTERNAL_API_LIMIT_GAP_MS, INTERNAL_API_LIMIT_RATE } from "../src/shared/config.js"

const tooSoonEpoch: number = 1708719506123
const laterCurrentEpoch: number = tooSoonEpoch + INTERNAL_API_LIMIT_GAP_MS + 1

const emptyPastEpochs: number[] = []
let fullPastEpochs: number[] = [
	1708719501909, 1708719502272, 1708719502570, 1708719502891, 1708719503297, 1708719503682,
	1708719504067, 1708719504428, 1708719504771, 1708719505113,
]
fullPastEpochs = fullPastEpochs.slice(0, INTERNAL_API_LIMIT_RATE)
let almostFullPastEpochs = fullPastEpochs.slice(0, INTERNAL_API_LIMIT_RATE - 1)

describe("Football-data api rate limit", () => {
	it("Should be in rate, first invocation", async (): Promise<void> => {
		const validation = isInApiRate(tooSoonEpoch, emptyPastEpochs)
		expect(validation.valid).toBe(true)
	})
	it("Should be in rate, enough time has past", async (): Promise<void> => {
		const validation = isInApiRate(laterCurrentEpoch, fullPastEpochs)
		expect(validation.valid).toBe(true)
	})
	it("Exceeds rate, to many calls", async (): Promise<void> => {
		const validation = isInApiRate(tooSoonEpoch, fullPastEpochs)
		expect(validation.valid).toBe(false)
	})
	it("Should be in rate, last invocation reached limit", async (): Promise<void> => {
		const validation = isInApiRate(tooSoonEpoch, almostFullPastEpochs)
		expect(
			validation.valid && validation.updatedApiCalls.length == INTERNAL_API_LIMIT_RATE
		).toBe(true)
	})
})
