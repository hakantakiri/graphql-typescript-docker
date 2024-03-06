import { Team } from "./team.model.js"

export interface Coach {
	id: number
	name: string
	dateOfBirth: string
	nationality: string
	teamId: Team["id"]
}
