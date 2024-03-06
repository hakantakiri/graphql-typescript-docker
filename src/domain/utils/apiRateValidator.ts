import { INTERNAL_API_LIMIT_GAP_MS, INTERNAL_API_LIMIT_RATE } from "../../shared/config.js"

interface isInApiRateResp {
	valid: boolean
	updatedApiCalls: number[]
}
export const isInApiRate = (currentEpoch: number, pastCallEpochs: number[]): isInApiRateResp => {
	let validPastCalls = pastCallEpochs.filter(
		(pastEpoch) => pastEpoch > currentEpoch - INTERNAL_API_LIMIT_GAP_MS
	)
	if (validPastCalls.length < INTERNAL_API_LIMIT_RATE) {
		validPastCalls.push(currentEpoch)
		return {
			valid: true,
			updatedApiCalls: validPastCalls,
		}
	} else {
		return {
			valid: false,
			updatedApiCalls: validPastCalls,
		}
	}
}
