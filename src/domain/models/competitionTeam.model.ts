import { Competition } from "./competition.model.js"
import { Team } from "./team.model.js"

export interface CompetitionTeam {
	id: number
	competitionId: Competition["id"]
	teamId: Team["id"]
}
