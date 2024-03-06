import { INTERNAL_API_LIMIT_RATE } from "./config.js"

export const ERR_MSG_RATE_LIMIT_EXCEEDED = `Api calls rate limit exceeded. Made ${INTERNAL_API_LIMIT_RATE} invocations in less than 1 min.`
export const ERR_MSG_INVALID_LEAGUE_CODE = (leagueCode: string) => {
	return `Not valid leagueCode ${leagueCode}`
}
