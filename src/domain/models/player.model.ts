import { Team } from "./team.model.js"

export interface Player {
	id: number
	name: string
	position: string
	dateOfBirth: string
	nationality: string
	teamId: Team["id"]
}
